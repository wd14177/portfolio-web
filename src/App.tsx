import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useSpring } from 'motion/react';
import { 
  Github, 
  Mail, 
  ExternalLink, 
  ChevronRight, 
  Cpu, 
  BrainCircuit, 
  ShoppingBag, 
  Database, 
  MessageSquare,
  Activity,
  User,
  GraduationCap,
  Layers,
  X,
  Code
} from 'lucide-react';

// --- Components ---

const Modal = ({ isOpen, onClose, title, content }: { isOpen: boolean, onClose: () => void, title: string, content: React.ReactNode }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[32px] shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          <div className="p-8 border-b border-gray-100 flex justify-between items-center">
            <h3 className="text-2xl font-bold tracking-tight text-ink">{title}</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-body-muted">
              <X size={24} />
            </button>
          </div>
          <div className="p-10 overflow-y-auto custom-scrollbar flex-grow">
            <div className="prose prose-slate max-w-none prose-headings:text-ink prose-p:text-body-muted prose-strong:text-ink">
              {content}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/70 backdrop-blur-xl py-3 border-b border-gray-100 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter text-ink"
        >
          JONGWOO <span className="text-action-blue font-medium tracking-tight">AI</span>
        </motion.div>
        <div className="flex gap-10 text-[11px] font-bold uppercase tracking-[2px]">
          {['Intro', 'Projects', 'Experience'].map((item) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              whileHover={{ color: '#0066cc' }}
              className="text-body-muted transition-colors"
            >
              {item}
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  );
};

const ThreeDCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { damping: 20, stiffness: 100 });
  const y = useSpring(0, { damping: 20, stiffness: 100 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Limits: 10 degrees tilt for subtle effect
    x.set(mouseY / (rect.height / 2) * -10);
    y.set(mouseX / (rect.width / 2) * 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: x,
        rotateY: y,
        transformStyle: 'preserve-3d',
      }}
      className={`relative perspective-1000 ${className}`}
    >
      <div style={{ transform: 'translateZ(50px)' }} className="w-full h-full glass-panel shadow-[0_30px_60px_rgba(0,0,0,0.08)] overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-16 text-center lg:text-left">
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-[#86868b] font-bold uppercase tracking-[4px] text-xs mb-4"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl lg:text-7xl font-extrabold tracking-tighter text-ink lg:max-w-4xl leading-[1.05]"
    >
      {children}
    </motion.h2>
  </div>
);

// --- Main Page ---

export default function App() {
  const [activeModal, setActiveModal] = useState<{title: string, content: React.ReactNode} | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const techNoteContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">기획 동기 및 배경</h4>
        <p className="text-body-muted">채팅(Slack)과 메일(Gmail) 등 파편화된 소통 채널에 흩어져 있는 <strong>업무 히스토리 및 의사결정 맥락(Context)의 유실을 방지</strong>하고 중앙화하는 솔루션입니다. 담당자 부재나 퇴사 시 발생하는 정보의 '블랙박스' 현상을 시스템적으로 해결합니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">핵심 차별점</h4>
        <p className="text-body-muted">기존의 협업 툴(Jira, Swit 등)이 사용자의 명령에 반응하는 수동적 비서라면, Paraworks는 백그라운드에서 실시간으로 맥락을 파악하는 <strong>'능동적 관찰자(Proactive Observer)'</strong>로서 Zero-Click 지식 자산화를 실현합니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">주요 아키텍처 (LangChain 1.0)</h4>
        <ul className="list-disc pl-5 space-y-2 text-body-muted">
          <li><strong>이벤트 탐지 Agent:</strong> Slack/Gmail 스트림을 감시하여 의사결정 이벤트를 분류하고 구조화된 데이터(JSON)로 추출.</li>
          <li><strong>Human-in-the-loop Middleware:</strong> 데이터 확정 전 사용자의 피드백(승인/수정) 루프를 구현하여 데이터 무결성 확보.</li>
          <li><strong>PII Redaction Middleware:</strong> 기업 내부의 민감 정보 유출을 차단하기 위한 LLM 전달 전 마스킹 처리.</li>
        </ul>
      </div>
    </div>
  );

  const retailProjectContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">프로젝트 개요</h4>
        <p className="text-body-muted">카메라 기반 Vision AI와 음성 기반 LLM 인터페이스를 결합한 <strong>멀티모달 AI 무인 편의점 시스템</strong>입니다. 상품 안내부터 계산, 이상행동 탐지까지 End-to-End 데모를 구현했습니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">기술적 도전 및 해결</h4>
        <p className="text-body-muted">다중 상품 환경에서 YOLO 기반 Detection의 불안정성을 해결하기 위해 <strong>SAM2(Segmentation) + SigLIP(Similarity) 분류 구조</strong>로 전환하여 정확도 중심의 파이프라인을 완성했습니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">주요 기능 파이프라인</h4>
        <ul className="list-disc pl-5 space-y-2 text-body-muted">
          <li><strong>계산대 인식:</strong> SAM2 Segmentation → Crop → SigLIP Embedding 비교 → 상품 리스트 JSON 생성.</li>
          <li><strong>음성 UI (VUI):</strong> Whisper(STT) → LLM 기반 의도 파악 → TTS 파이프라인 구축.</li>
          <li><strong>이상행동 탐지:</strong> Pose Tracking + Rule Engine 기반 탐지 로직에 CLIP/SigLIP을 보강하여 탐지율 향상.</li>
        </ul>
      </div>
    </div>
  );

  const dataAnalyticsContent = (
    <div className="space-y-6">
      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">프로젝트 개요</h4>
        <p className="text-body-muted">중고거래 데이터를 활용하여 상품의 <strong>판매 확률을 예측하는 ML 모델</strong>을 개발하고 서비스화했습니다. 데이터 수집부터 배포까지 ML Pipeline 전체를 직접 구축했습니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">데이터 엔지니어링</h4>
        <p className="text-body-muted">공식 API가 없는 환경에서 <strong>Reverse Engineering 방식</strong>으로 내부 JSON 데이터를 분석, 크롤링 제한을 극복하며 약 22만 건의 실제 거래 데이터를 확보했습니다.</p>
      </div>

      <div className="space-y-4">
        <h4 className="text-xl font-bold text-ink">핵심 분석 인사이트</h4>
        <ul className="list-disc pl-5 space-y-2 text-body-muted">
          <li><strong>Feature Importance:</strong> 판매 확률에 가장 큰 영향을 주는 요소는 가격이 아니라 <strong>게시글의 내용(Content)</strong>과 상세 정보의 신뢰도임을 확인.</li>
          <li><strong>기술 스택:</strong> LightGBM, CatBoost 모델 앙상블 및 Streamlit 기반 데모 구축.</li>
          <li><strong>성과:</strong> ROC-AUC 약 0.80 달성으로 판매 가능성 탐지 성능 확보.</li>
        </ul>
      </div>
    </div>
  );

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <div className="min-h-screen bg-white selection:bg-action-blue selection:text-white">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[800px] h-[800px] bg-action-blue/5 rounded-full blur-[150px] opacity-60" />
        <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] opacity-40" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-8 z-10"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 inline-block px-6 py-2 rounded-full bg-canvas-parchment text-action-blue text-[10px] font-black tracking-[5px] uppercase"
          >
            AI RESEARCH & DEVELOPMENT
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl md:text-9xl lg:text-[11rem] font-extrabold tracking-[-0.04em] leading-[1] mb-14"
          >
            <span className="hero-accent-text">KIM</span> <br className="hidden md:block" /> <span className="hero-accent-text">JONGWOO</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="flex flex-col items-center gap-14"
          >
            <p className="text-xl md:text-3xl text-body-muted max-w-3xl mx-auto leading-relaxed font-normal tracking-tight">
              교육 문제를 AI 기반 시스템으로 <span className="text-ink font-bold">구조적으로 해결</span>하고 <br /> 실시간 지능형 에이전트를 설계하는 AI 엔지니어입니다.
            </p>
            <div className="cta-row flex flex-col sm:flex-row gap-6">
              <a href="#projects" className="bg-action-blue text-white px-12 py-5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest shadow-lg shadow-action-blue/20">
                View My Projects
              </a>
              <a href="mailto:wd14177@gmail.com" className="bg-ink text-white px-12 py-5 rounded-full font-bold hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">
                Contact Me
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Intro Section */}
      <section id="intro" className="py-40 px-8 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="PROBLEM & MISSION">
            <span className="text-body-muted font-light">교육의 핵심 문제는 <br /> 콘텐츠 부족이 아니라</span> <br />
            <span className="text-ink font-bold">학습 과정과 <br /> 실시간 피드백</span><span className="text-body-muted font-light">의 부재입니다.</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                icon: Activity, 
                title: "AI Agent 흐름 추적", 
                desc: "학습자의 미세한 활동 데이터를 캡처하고 분석하여 최적의 개인화 흐름을 설계합니다." 
              },
              { 
                icon: MessageSquare, 
                title: "행동 기반 피드백", 
                desc: "단순한 정답 체크를 넘어 행동의 맥락을 이해하고 실시간으로 교정 정보를 제공합니다." 
              },
              { 
                icon: Database, 
                title: "RAG 지식 구조화", 
                desc: "파편화된 학습 히스토리를 시맨틱 데이터로 변환하여 지능형 자산으로 구축합니다." 
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-12 group hover:border-action-blue/20 hover:bg-white transition-all duration-500 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-action-blue/10 flex items-center justify-center mb-8 text-action-blue group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-6 tracking-tight text-ink">{item.title}</h3>
                <p className="text-body-muted leading-relaxed text-base">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-40 px-8 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <SectionHeading subtitle="CORE PROJECTS">
            데이터와 맥락으로 설계한 <br /> <span className="font-light opacity-50">인텔리전트 시스템 아키텍처</span>
          </SectionHeading>

          {/* Project 1: Paraworks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-56">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 bg-action-blue/10 border border-action-blue/20 text-action-blue text-[10px] font-bold tracking-widest uppercase rounded">PROJECT 1</span>
              </div>
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-8 tracking-tighter text-ink leading-tight">Paraworks : <br />능동형 업무 히스토리 <br />관리 솔루션</h3>
              <p className="text-body-muted text-xl mb-12 leading-relaxed max-w-xl font-normal">
                채팅(Slack)과 메일(Gmail) 등 파편화된 소통 채널에 흩어져 있는 <strong>업무 히스토리 및 의사결정 맥락(Context)의 유실을 방지</strong>하고 중앙화합니다.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Multi-Agent', 'LangChain', 'Vector DB', 'HITL'].map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-canvas-parchment rounded-lg text-xs font-bold uppercase tracking-wider text-body-muted border border-gray-200">{skill}</span>
                ))}
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setActiveModal({ title: "Nexus Paraworks: Technical Note", content: techNoteContent })}
                  className="flex items-center gap-3 font-bold text-action-blue hover:opacity-70 transition-opacity uppercase text-xs tracking-widest"
                >
                  View Technical Note <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
            
            <ThreeDCard className="h-[500px]">
              <div className="h-full bg-gradient-to-br from-action-blue/10 to-transparent p-16 flex flex-col justify-end">
                <div className="label text-action-blue mb-4 text-[10px] font-black uppercase tracking-[4px]">Active Process</div>
                <div className="text-3xl font-bold mb-4 text-ink">Autonomous <br /> Context Extraction</div>
                <div className="text-sm text-body-muted leading-relaxed max-w-xs mb-8 font-medium">
                  Analyzing team streams and documents to build persistent shared memory.
                </div>
                <div className="flex gap-2">
                   <div className="w-12 h-1 bg-gray-200 rounded-full" />
                   <div className="w-4 h-1 bg-gray-200 rounded-full" />
                   <div className="w-8 h-1 bg-action-blue rounded-full" />
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Project 2: Multi-modal AI */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-56">
            <div className="lg:order-2">
              <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-600 text-[10px] font-bold tracking-widest uppercase rounded">PROJECT 2</span>
              </div>
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-8 tracking-tighter text-ink leading-tight">Vision-Voice Integrated <br /> 무인 AI 리테일 시스템</h3>
              <p className="text-body-muted text-xl mb-12 leading-relaxed max-w-xl font-normal">
                Vision과 Voice를 결합한 통합 멀티모달 상호작용 시스템입니다. 단순 카메라 감지를 넘어 사용자의 음성 의도를 복합적으로 분석하여 리테일 경험을 혁신합니다.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Python', 'PyTorch', 'OpenCV', 'FastAPI'].map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-canvas-parchment rounded-lg text-xs font-bold uppercase tracking-wider text-body-muted border border-gray-200">{skill}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-canvas-parchment p-8 rounded-3xl border border-gray-200">
                  <p className="text-3xl font-black text-ink mb-2">40%</p>
                  <p className="text-[10px] text-body-muted uppercase font-black tracking-widest">Inference Speed Up</p>
                </div>
                <div className="bg-canvas-parchment p-8 rounded-3xl border border-gray-200">
                  <p className="text-3xl font-black text-ink mb-2">98.2%</p>
                  <p className="text-[10px] text-body-muted uppercase font-black tracking-widest">Recognition Rate</p>
                </div>
              </div>
              <button 
                onClick={() => setActiveModal({ title: "Vision-Voice AI Retail: Project Details", content: retailProjectContent })}
                className="flex items-center gap-3 font-bold text-action-blue hover:opacity-70 transition-opacity uppercase text-xs tracking-widest"
              >
                View Technical Note <ChevronRight size={16} />
              </button>
            </div>
            
            <ThreeDCard className="h-[500px] lg:order-1">
              <div className="relative h-full flex flex-col justify-center items-center overflow-hidden bg-white border border-gray-100">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-action-blue)_0%,_transparent_70%)] opacity-[0.03]" />
                <motion.div
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 20px rgba(0,102,204,0.1)",
                      "0 0 50px rgba(0,102,204,0.2)",
                      "0 0 20px rgba(0,102,204,0.1)"
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="w-48 h-48 border-2 border-action-blue/20 rounded-full flex items-center justify-center bg-white"
                >
                  <BrainCircuit size={64} className="text-action-blue opacity-80" />
                </motion.div>
                <div className="mt-12 font-mono text-[9px] tracking-[5px] text-body-muted uppercase font-bold">
                  Multimodal Sync Active
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between gap-4">
                   <div className="h-1 flex-grow bg-gray-100 rounded-full overflow-hidden">
                      <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-action-blue" />
                   </div>
                   <div className="h-1 flex-grow bg-gray-100 rounded-full overflow-hidden">
                      <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }} className="w-1/3 h-full bg-purple-500" />
                   </div>
                </div>
              </div>
            </ThreeDCard>
          </div>

          {/* Project 3: Predict sales */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
               <div className="flex items-center gap-4 mb-8">
                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-600 text-[10px] font-bold tracking-widest uppercase rounded">PROJECT 3</span>
              </div>
              <h3 className="text-5xl lg:text-6xl font-extrabold mb-8 tracking-tighter text-ink leading-tight">중고 거래 확률 <br /> 예측 서비스</h3>
              <p className="text-body-muted text-xl mb-12 leading-relaxed max-w-xl font-normal">
                직관에 의존하던 중고 거래의 의사결정을 데이터로 구조화했습니다. 약 22만 건의 데이터를 정제하여 최고 성능의 예측 모델을 서비스화했습니다.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {['Scikit-Learn', 'CatBoost', 'Pandas', 'Flask'].map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-canvas-parchment rounded-lg text-xs font-bold uppercase tracking-wider text-body-muted border border-gray-200">{skill}</span>
                ))}
              </div>
              <div className="flex gap-16">
                <div>
                  <p className="text-4xl font-bold text-ink">0.80</p>
                  <p className="text-[10px] text-body-muted uppercase font-black tracking-widest mt-2">ROC-AUC</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-ink">220K+</p>
                  <p className="text-[10px] text-body-muted uppercase font-black tracking-widest mt-2">Datasets</p>
                </div>
              </div>
              <div className="flex gap-4 mt-12">
                <button 
                  onClick={() => setActiveModal({ title: "Used Goods Prediction: Technical Note", content: dataAnalyticsContent })}
                  className="flex items-center gap-3 font-bold text-action-blue hover:opacity-70 transition-opacity uppercase text-xs tracking-widest"
                >
                  View Technical Note <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
            
            <ThreeDCard className="h-[500px]">
              <div className="p-12 h-full flex flex-col justify-between bg-canvas-parchment">
                <div className="flex justify-between items-center">
                   <div className="w-12 h-1 bg-gray-300 rounded-full" />
                   <div className="text-[9px] font-mono text-body-muted tracking-[3px]">MODEL_V4_RUNNING</div>
                </div>
                <div className="space-y-6">
                   {[70, 40, 85, 30].map((w, i) => (
                     <div key={i} className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${w}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, delay: i * 0.1 }}
                          className="h-full bg-action-blue shadow-[0_0_10px_rgba(0,102,204,0.3)]" 
                        />
                     </div>
                   ))}
                </div>
                <div className="glass-panel p-8 flex items-center justify-between border-gray-200 bg-white">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-xs font-bold text-ink">AI</div>
                      <div className="space-y-1">
                        <div className="w-20 h-1 bg-gray-200 rounded-full" />
                        <div className="w-12 h-1 bg-gray-100 rounded-full" />
                      </div>
                   </div>
                   <div className="text-right">
                      <p className="text-[40px] font-black tracking-tighter text-ink">84<span className="text-sm opacity-40">%</span></p>
                   </div>
                </div>
              </div>
            </ThreeDCard>
          </div>
        </div>
      </section>

      {/* Experience Section Redesign */}
      <section id="experience" className="py-40 z-10 relative bg-canvas-parchment">
        <div className="max-w-7xl mx-auto px-8">
          <SectionHeading subtitle="CAREER JOURNEY">
            설계 역량의 확장 <br /> <span className="font-light text-body-muted">Legacy Experience to AI Core</span>
          </SectionHeading>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left Column: Timeline/Career */}
            <div className="lg:col-span-12 space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { from: "커리큘럼 설계", to: "Pipeline Architecture", desc: "학습 흐름을 알고리즘적 파이프라인으로 구조화하여 자동화된 흐름 설계 역량을 확보했습니다." },
                  { from: "교안 개발", to: "Semantic UI Design", desc: "사용자 중심의 직관적인 인터페이스를 넘어, AI가 이해할 수 있는 정형화된 데이터 구조를 설계합니다." },
                  { from: "학습 흐름 통제", to: "Agent Logic Control", desc: "복합적인 변수와 예외 상황을 고려한 견고한 에이전트 인터랙션 가이드라인을 구축합니다." },
                  { from: "피드백 시스템", to: "Optimization Loop", desc: "결과에 대한 단순 평가를 넘어, 실시간 피드백 루프를 통한 지속적인 시스템 성능 고도화를 추구합니다." },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-action-blue/5 transition-all group"
                  >
                     <div className="text-[10px] font-black text-body-muted uppercase tracking-widest mb-6 block opacity-50">{item.from}</div>
                     <h4 className="text-2xl font-bold tracking-tight text-ink mb-6 group-hover:text-action-blue transition-colors leading-tight">{item.to}</h4>
                     <p className="text-body-muted text-sm font-normal leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Capabilities & Vision */}
            <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { title: "Backend", stack: ["FastAPI", "Python", "NoSQL"] },
                { title: "AI/ML", stack: ["LangChain", "PyTorch", "NLP"] },
                { title: "Frontend", stack: ["React", "Motion", "Tailwind"] },
                { title: "System", stack: ["Multi-Agent", "RAG", "Vector DB"] }
              ].map((group, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-action-blue/20 transition-all group shadow-sm flex flex-col">
                  <h4 className="text-[10px] font-black text-action-blue uppercase tracking-[3px] mb-6">{group.title}</h4>
                  <div className="flex flex-col gap-3">
                    {group.stack.map(s => (
                      <span key={s} className="text-sm font-semibold text-body-muted group-hover:text-ink transition-colors">{s}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="h-full p-10 bg-action-blue rounded-[32px] overflow-hidden relative group shadow-2xl shadow-action-blue/30 border-none transition-transform hover:scale-[1.02] flex flex-col justify-center">
                <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white blur-[120px] opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none" />
                <h4 className="text-3xl font-bold mb-6 italic text-white tracking-tighter leading-tight relative z-10">Architecting <br /> Tomorrow's Intelligence</h4>
                <p className="text-white text-sm leading-relaxed max-w-sm font-medium relative z-10">
                  모델 구현을 넘어 사용자와 시스템이 상호작용하는 모든 접점의 지능을 설계합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 border-t border-gray-100 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-body-muted text-[10px] font-black uppercase tracking-[10px] mb-16"
          >
            KIM JONGWOO PORTFOLIO
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-20 mb-24">
            <a href="mailto:wd14177@gmail.com" className="group text-center">
              <p className="text-[10px] text-body-muted font-black uppercase tracking-widest mb-6">Connect</p>
              <p className="text-4xl font-extrabold text-ink group-hover:text-action-blue transition-colors leading-none tracking-tighter">Email.</p>
            </a>
            <a href="https://github.com/wd14177/ai-agent-portfolio" target="_blank" rel="noopener noreferrer" className="group text-center">
              <p className="text-[10px] text-body-muted font-black uppercase tracking-widest mb-6">Source</p>
              <p className="text-4xl font-extrabold text-ink group-hover:text-action-blue transition-colors leading-none tracking-tighter">Github.</p>
            </a>
            <a href="https://www.linkedin.com/in/j0ngwoo-kim/" target="_blank" rel="noopener noreferrer" className="group text-center">
              <p className="text-[10px] text-body-muted font-black uppercase tracking-widest mb-6">Professional</p>
              <p className="text-4xl font-extrabold text-ink group-hover:text-action-blue transition-colors leading-none tracking-tighter">LinkedIn.</p>
            </a>
          </div>

          <p className="text-body-muted text-[10px] font-bold tracking-[5px] uppercase">
            © 2026 Designed and Built by Kim Jongwoo.
          </p>
        </div>
      </footer>
      
      <Modal 
        isOpen={!!activeModal} 
        onClose={() => setActiveModal(null)} 
        title={activeModal?.title || ""} 
        content={activeModal?.content} 
      />
    </div>
  );
}
