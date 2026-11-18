(() => {
  "use strict";

  const config = window.SURVEY_CONFIG || {};
  const categoryNames = {
    a2t: "Audio-to-Text",
    a2s: "Audio-to-Speech",
    av: "Audio-Visual",
    agent: "Agentic Audio"
  };

  const taxonomy = {
    a2t: {
      number: "PARADIGM 01",
      name: "Audio-to-Text Reasoning",
      description: "Infer a textual answer from acoustic evidence while preserving cues that a transcript may discard.",
      branches: ["Prompting and Grounded Decoding", "Reasoning and Perception Alignment", "Adaptive and Audio-Grounded RL", "Dataset and Pre-processing"]
    },
    a2s: {
      number: "PARADIGM 02",
      name: "Audio-to-Speech Reasoning",
      description: "Embed reasoning in spoken interaction and balance the depth of thought against conversational latency.",
      branches: ["Sequential Audio-to-Speech", "Thinking While Listening", "Thinking While Speaking", "Training Data and Latency"]
    },
    av: {
      number: "PARADIGM 03",
      name: "Audio-Visual Reasoning",
      description: "Align synchronized sound and vision, then reason from complementary evidence across both modalities.",
      branches: ["Joint Evidence Learning", "Temporally Grounded Curriculum", "Modality-Factored Reasoning", "Audio-Visual Benchmarks"]
    },
    agent: {
      number: "PARADIGM 04",
      name: "Agentic Audio Reasoning",
      description: "Extend direct generation with planning, memory, reflection, and the coordinated use of acoustic skills and external tools.",
      branches: ["Predefined Workflow Agents", "Dynamic Skill- and Tool-Calling", "Agentic Design Patterns"]
    }
  };

  const papers = [
    { name: "TJSTG", title: "Target-Aware Spatio-Temporal Reasoning via Answering Questions in Dynamic Audio-Visual Scenarios", authors: "Yuanyuan Jiang et al.", year: 2023, month: 5, category: "av", url: "https://arxiv.org/abs/2305.12397" },
    { name: "Mini-Omni", title: "Mini-Omni: Language Models Can Hear, Talk While Thinking in Streaming", authors: "Zhifei Xie et al.", year: 2024, month: 8, category: "a2s", url: "https://arxiv.org/abs/2408.16725" },
    { name: "TSART", title: "Temporal-Semantic Aligning and Reasoning Transformer for Audio-Visual Zero-Shot Learning", authors: "Kaiwen Zhang et al.", year: 2024, month: 7, category: "av", url: "https://www.mdpi.com/2227-7390/12/14/2200" },
    { name: "LLaMA-Omni", title: "LLaMA-Omni: Seamless Speech Interaction with Large Language Models", authors: "Qingkai Fang et al.", year: 2024, month: 9, category: "a2s", url: "https://arxiv.org/abs/2409.06666" },
    { name: "MALLM", title: "Beyond Single-Audio: Advancing Multi-Audio Processing in Audio Large Language Models", authors: "Yiming Chen et al.", year: 2024, month: 11, category: "a2t", url: "https://aclanthology.org/2024.findings-emnlp.640/" },
    { name: "Mini-Omni2", title: "Mini-Omni2: Towards Open-Source GPT-4o Model with Vision, Speech and Duplex", authors: "Zhifei Xie et al.", year: 2024, month: 10, category: "av", url: "https://arxiv.org/abs/2410.11190" },
    { name: "GLM-4-Voice", title: "GLM-4-Voice: Towards Intelligent and Human-Like End-to-End Spoken Chatbot", authors: "Aohan Zeng et al.", year: 2024, month: 12, category: "a2s", url: "https://arxiv.org/abs/2412.02612" },
    { name: "Audio-CoT", title: "Audio-CoT: Exploring Chain-of-Thought Reasoning in Large Audio Language Models", authors: "Ziyang Ma et al.", year: 2025, month: 1, category: "a2t", url: "https://arxiv.org/abs/2501.07246" },
    { name: "Audio-Reasoner", title: "Audio-Reasoner: Improving Reasoning Capability in Large Audio Language Models", authors: "Zhifei Xie et al.", year: 2025, month: 3, category: "a2t", url: "https://arxiv.org/abs/2503.02318" },
    { name: "Qwen2.5-Omni", title: "Qwen2.5-Omni Technical Report", authors: "Jin Xu et al.", year: 2025, month: 3, category: "a2s", url: "https://arxiv.org/abs/2503.20215" },
    { name: "Kimi-Audio", title: "Kimi-Audio Technical Report", authors: "Kimi Team et al.", year: 2025, month: 4, category: "a2s", url: "https://arxiv.org/abs/2504.18425" },
    { name: "Daily-Omni", title: "Daily-Omni: Towards Audio-Visual Reasoning with Temporal Alignment across Modalities", authors: "Ziwei Zhou et al.", year: 2025, month: 5, category: "av", url: "https://arxiv.org/abs/2505.17862" },
    { name: "AURA", title: "AURA: Agent for Understanding, Reasoning, and Automated Tool Use in Voice-Driven Tasks", authors: "Leander Melroy Maben et al.", year: 2025, month: 6, category: "agent", url: "https://arxiv.org/abs/2506.23049" },
    { name: "CoQo", title: "Guiding Audio-Visual Question Answering with Collective Question Reasoning", authors: "Baoqi Pei et al.", year: 2025, month: 7, category: "av", url: "https://doi.org/10.1007/s11263-025-02510-7" },
    { name: "Step-Audio 2", title: "Step-Audio 2 Technical Report", authors: "Boyong Wu et al.", year: 2025, month: 7, category: "a2s", url: "https://arxiv.org/abs/2507.16632" },
    { name: "Audio Flamingo 3", title: "Audio Flamingo 3: Advancing Audio Intelligence with Fully Open Large Audio Language Models", authors: "Arushi Goel, Sreyan Ghosh et al.", year: 2025, month: 7, category: "a2t", url: "https://arxiv.org/abs/2507.08128" },
    { name: "Audio-Thinker", title: "Audio-Thinker: Guiding Audio Language Model When and How to Think via Reinforcement Learning", authors: "Shu Wu et al.", year: 2025, month: 8, category: "a2t", url: "https://arxiv.org/abs/2508.08039" },
    { name: "Mini-Omni-Reasoner", title: "Mini-Omni-Reasoner: Token-Level Thinking-in-Speaking in Large Speech Models", authors: "Zhifei Xie et al.", year: 2025, month: 8, category: "a2s", url: "https://arxiv.org/abs/2508.15827" },
    { name: "Audio Flamingo Sound-CoT", title: "Audio Flamingo Sound-CoT Technical Report: Improving Chain-of-Thought Reasoning in Sound Understanding", authors: "Zhifeng Kong et al.", year: 2025, month: 8, category: "a2t", url: "https://arxiv.org/abs/2508.11818" },
    { name: "SightSound-R1", title: "SightSound-R1: Cross-Modal Reasoning Distillation from Vision to Audio Language Models", authors: "Qiaolin Wang et al.", year: 2025, month: 9, category: "a2t", url: "https://arxiv.org/abs/2509.15661" },
    { name: "Qwen3-Omni", title: "Qwen3-Omni Technical Report", authors: "Jin Xu et al.", year: 2025, month: 9, category: "av", url: "https://arxiv.org/abs/2509.17765" },
    { name: "AVRT", title: "AVRT: Audio-Visual Reasoning Transfer through Single-Modality Teachers", authors: "Edson Araujo et al.", year: 2025, month: 9, category: "av", url: "https://openreview.net/forum?id=57bSlUHBfV" },
    { name: "Thinking with Sound", title: "Thinking with Sound: Audio Chain-of-Thought Enables Multimodal Reasoning in Large Audio-Language Models", authors: "Zhen Xiong et al.", year: 2025, month: 9, category: "agent", url: "https://arxiv.org/abs/2509.21749" },
    { name: "AudioGenie-Reasoner", title: "AudioGenie-Reasoner: A Training-Free Multi-Agent Framework for Coarse-to-Fine Audio Deep Reasoning", authors: "Yan Rong et al.", year: 2025, month: 9, category: "agent", url: "https://arxiv.org/abs/2509.16971" },
    { name: "Chronological Thinking", title: "Chronological Thinking in Full-Duplex Spoken Dialogue Language Models", authors: "Donghang Wu et al.", year: 2025, month: 10, category: "a2s", url: "https://arxiv.org/abs/2510.05150" },
    { name: "SHANKS", title: "SHANKS: Simultaneous Hearing and Thinking for Spoken Language Models", authors: "Cheng-Han Chiang et al.", year: 2025, month: 10, category: "a2s", url: "https://arxiv.org/abs/2510.06917" },
    { name: "AudioToolAgent", title: "AudioToolAgent: An Agentic Framework for Audio-Language Models", authors: "Gijs Wijngaard et al.", year: 2025, month: 10, category: "agent", url: "https://arxiv.org/abs/2510.02995" },
    { name: "MPS", title: "Mind-Paced Speaking: A Dual-Brain Approach to Real-Time Reasoning in Spoken Language Models", authors: "Donghang Wu et al.", year: 2025, month: 10, category: "a2s", url: "https://arxiv.org/abs/2510.09592" },
    { name: "Audio-Maestro", title: "Audio-Maestro: Enhancing Large Audio-Language Models with Tool-Augmented Reasoning", authors: "Kuan-Yi Lee, Tsung-En Lin, Hung-Yi Lee", year: 2025, month: 10, category: "agent", url: "https://arxiv.org/abs/2510.11454" },
    { name: "SAR-LM", title: "SAR-LM: Symbolic Audio Reasoning with Large Language Models", authors: "Termeh Taheri et al.", year: 2025, month: 11, category: "a2t", url: "https://arxiv.org/abs/2511.06483" },
    { name: "STITCH", title: "STITCH: Simultaneous Thinking and Talking with Chunked Reasoning for Spoken Language Models", authors: "Cheng-Han Chiang et al.", year: 2026, month: 1, category: "a2s", url: "https://openreview.net/forum?id=5Z1eMhCeTb" },
    { name: "TWL", title: "Can Speech LLMs Think while Listening?", authors: "Yi-Jen Shih et al.", year: 2026, month: 1, category: "a2s", url: "https://openreview.net/forum?id=dFVenZdVbX" },
    { name: "Echo", title: "Echo: Towards Advanced Audio Comprehension via Audio-Interleaved Reasoning", authors: "Daiqing Wu et al.", year: 2026, month: 1, category: "a2t", url: "https://openreview.net/forum?id=xI6yOdOtga" },
    { name: "Speech-Hands", title: "Speech-Hands: A Self-Reflection Voice Agentic Approach to Speech Recognition and Audio Reasoning with Omni Perception", authors: "Zhen Wan et al.", year: 2026, month: 1, category: "agent", url: "https://arxiv.org/abs/2601.09413" },
    { name: "ReEmpathy", title: "Reflecting Twice before Speaking with Empathy", authors: "Yuhang Jia et al.", year: 2026, month: 1, category: "a2s", url: "https://arxiv.org/abs/2601.18281" },
    { name: "EmotionThinker", title: "EmotionThinker: Prosody-Aware Reinforcement Learning for Explainable Speech Emotion Reasoning", authors: "Dingdong Wang et al.", year: 2026, month: 1, category: "a2t", url: "https://arxiv.org/abs/2601.15668" },
    { name: "LTS-VoiceAgent", title: "LTS-VoiceAgent: A Listen-Think-Speak Framework for Efficient Streaming Voice Interaction", authors: "Wenhao Zou et al.", year: 2026, month: 1, category: "agent", url: "https://arxiv.org/abs/2601.19952" },
    { name: "FLAIR", title: "The Silent Thought: Modeling Internal Cognition in Full-Duplex Spoken Dialogue Models via Latent Reasoning", authors: "Donghang Wu et al.", year: 2026, month: 3, category: "a2s", url: "https://arxiv.org/abs/2603.17837" },
    { name: "InterRS", title: "Thinking-while-Speaking: A Controlled, Interleaved Reasoning Method for Real-Time Speech Generation", authors: "Xuan Du et al.", year: 2026, month: 5, category: "a2s", url: "https://arxiv.org/abs/2605.20946" },
    { name: "Dual-Reasoner", title: "Dual-Reasoner: Bridging Interleaved Atomicity and Streaming Latency via Thinking-while-Talking", authors: "Yangzhuo Li et al.", year: 2026, month: 7, category: "a2s", url: "https://aclanthology.org/2026.findings-acl.199/" },
    { name: "AV-Flamingo", title: "Audio-Visual Flamingo: Open Audio-Visual Intelligence for Long and Complex Videos", authors: "Sreyan Ghosh et al.", year: 2026, month: 7, category: "av", url: "https://arxiv.org/abs/2607.16107" },
    { name: "AudioRubrics", title: "Reinforcement Learning with Evolving Rubrics as Rewards for Audio Reasoning", authors: "Fangxu Yu et al.", year: 2026, month: 8, category: "a2t", url: "https://arxiv.org/abs/2608.02831" },
    { name: "SpeechAgent-R", title: "Hear, Invoke, and Understand: A Skill-Calling Multimodal Agent for Large Audio Language Models", authors: "Yuwen Wang et al.", year: 2026, month: 8, category: "agent", url: "https://arxiv.org/abs/2608.01881" },
    { name: "RetroThinker", title: "RetroThinker: Enabling Retrospective Thinking in Speech LLMs", authors: "Yi-Jen Shih et al.", year: 2026, month: 9, category: "a2s", url: "https://arxiv.org/abs/2609.11864" },
    { name: "Think Aloud", title: "Spoken Language Models that Think Aloud", authors: "Junyi Ao et al.", year: 2026, month: 9, category: "a2s", url: "https://arxiv.org/abs/2609.26488" },
    { name: "OmniReasoning", title: "OmniReasoning: Pushing the Limits of Audio-Visual Joint Reasoning", authors: "Junming Lin et al.", year: 2026, month: 9, category: "av", url: "https://arxiv.org/abs/2609.39490" },
    { name: "NemotronLabs VoiceChat", title: "NemotronLabs VoiceChat: An Open Full-Duplex Speech-to-Speech Model with Tool Calling Capabilities", authors: "Jagadeesh Balam et al.", year: 2026, month: 9, category: "agent", url: "https://arxiv.org/abs/2609.21967" },
    { name: "A2R", title: "HEAR Who Said What: Unlocking Speaker-Attributed Reasoning via Counterfactual Voice Grounding", authors: "Dongwook Lee et al.", year: 2026, month: 10, category: "a2t", url: "https://aclanthology.org/2026.emnlp-main.2503/" },
    { name: "Audio-ReaPer", title: "Perception Is the Bottleneck for Large Audio Reasoning Models", authors: "Ziyang Ma et al.", year: 2026, month: 10, category: "a2t", url: "https://aclanthology.org/2026.findings-emnlp.1272/" },
    { name: "SKAD", title: "SKAD: Sketch-Guided Audio-Contrastive Decoding for Reasoning in Large Audio-Language Models", authors: "Junyu Wang et al.", year: 2026, month: 10, category: "a2t", url: "https://arxiv.org/abs/2610.28146" }
  ];

  const benchmarks = [
    { name: "MMAU", domain: "General Audio Reasoning", audio: "Speech · Sound · Music", eval: "Closed", size: "10K", tasks: "27", year: 2024, description: "A broad evaluation of audio understanding and reasoning across speech, environmental sound, and music.", url: "https://arxiv.org/abs/2410.19168", shape: [0.92, 0.78, 0.35, 0.92] },
    { name: "MMAU-Pro", domain: "General Audio Reasoning", audio: "Speech · Sound · Music", eval: "Closed", size: "5.3K", tasks: "49", year: 2025, description: "A more difficult extension with broader task coverage and holistic audio intelligence evaluation.", url: "https://arxiv.org/abs/2508.13992", shape: [0.95, 0.67, 0.3, 0.92] },
    { name: "MMAR", domain: "General Audio Reasoning", audio: "Speech · Sound · Music", eval: "Closed", size: "1K", tasks: "16", year: 2025, description: "Deep reasoning over speech, sound, music, and mixtures of multiple audio types.", url: "https://arxiv.org/abs/2505.13032", shape: [0.9, 0.48, 0.3, 0.92] },
    { name: "MMSU", domain: "Speech-focused Reasoning", audio: "Speech", eval: "Closed", size: "5K", tasks: "47", year: 2025, description: "Massive multi-task spoken-language understanding and reasoning.", url: "https://arxiv.org/abs/2506.04779", shape: [0.72, 0.65, 0.3, 0.35] },
    { name: "VoxEval", domain: "Speech-focused Reasoning", audio: "Speech", eval: "Closed", size: "14K", tasks: "56", year: 2025, description: "Knowledge understanding and spoken reasoning for end-to-end spoken language models.", url: "https://aclanthology.org/2025.acl-long.817/", shape: [0.74, 0.94, 0.3, 0.35] },
    { name: "CMDAR", domain: "Chinese Audio Reasoning", audio: "Speech · Sound", eval: "Closed + Open", size: "3K", tasks: "5", year: 2025, description: "Chinese multi-scene dynamic audio reasoning with diverse acoustic challenges.", url: "https://arxiv.org/abs/2509.22461", shape: [0.66, 0.56, 0.78, 0.65] },
    { name: "Spoken-MQA", domain: "Spoken Mathematical Reasoning", audio: "Speech", eval: "Closed + Open", size: "3K", tasks: "5", year: 2025, description: "Multi-faceted mathematical reasoning presented and answered through speech.", url: "https://arxiv.org/abs/2505.15000", shape: [0.78, 0.56, 0.8, 0.35] },
    { name: "WildSpeech-Bench", domain: "End-to-end Interaction", audio: "Speech", eval: "Open", size: "1.1K", tasks: "5", year: 2025, description: "Evaluates speech language models under diverse, real-world spoken conditions.", url: "https://arxiv.org/abs/2506.21875", shape: [0.7, 0.45, 0.95, 0.35] },
    { name: "URO-Bench", domain: "End-to-end Interaction", audio: "Speech", eval: "Closed + Open", size: "7.3K", tasks: "20", year: 2025, description: "A comprehensive evaluation suite for end-to-end spoken dialogue models.", url: "https://arxiv.org/abs/2502.17810", shape: [0.72, 0.65, 0.72, 0.35] },
    { name: "VoiceAgentBench", domain: "Multi-turn Tool Use & Reasoning", audio: "Speech", eval: "Closed", size: "6K", tasks: "6", year: 2025, description: "Measures whether voice assistants can reason and complete agentic tasks across turns.", url: "https://arxiv.org/abs/2510.07978", shape: [0.88, 0.7, 0.3, 0.35] },
    { name: "SAKURA", domain: "Multi-hop Audio Reasoning", audio: "Speech · Sound", eval: "Closed", size: "4K", tasks: "4", year: 2025, description: "Multi-hop reasoning that combines information carried by speech and other sounds.", url: "https://arxiv.org/abs/2505.13237", shape: [0.84, 0.6, 0.3, 0.65] },
    { name: "WavBench", domain: "End-to-end Interaction", audio: "Speech", eval: "Closed + Open", size: "1.8K", tasks: "5 scenarios", year: 2026, description: "Reasoning, colloquialism, and paralinguistics for end-to-end spoken dialogue.", url: "https://arxiv.org/abs/2602.12135", shape: [0.76, 0.51, 0.75, 0.35] },
    { name: "τ-Voice", domain: "End-to-end Interaction", audio: "Speech", eval: "Closed", size: "0.3K", tasks: "3 domains", year: 2026, description: "Full-duplex voice agents evaluated across realistic task domains.", url: "https://arxiv.org/abs/2603.13686", shape: [0.8, 0.28, 0.3, 0.35] },
    { name: "AudioRAG", domain: "Audio Retrieval-based Reasoning", audio: "Speech · Sound · Music", eval: "Closed", size: "8K", tasks: "3 scenarios", year: 2026, description: "Audio information retrieval and reasoning across speech, sound, and music.", url: "https://arxiv.org/abs/2602.10656", shape: [0.84, 0.74, 0.3, 0.92] },
    { name: "Full-Duplex-Bench-v3", domain: "Multi-turn Tool Use & Reasoning", audio: "Speech", eval: "Closed", size: "0.1K", tasks: "4", year: 2026, description: "Tool use by full-duplex voice agents under realistic speech disfluency.", url: "https://arxiv.org/abs/2604.04847", shape: [0.86, 0.2, 0.3, 0.35] },
    { name: "HEAR", domain: "Speaker-attributed Reasoning", audio: "Speech", eval: "Closed", size: "2.4K", tasks: "8", year: 2026, description: "Tests whether models attribute statements to the correct speaker and reason over voice identity.", url: "https://aclanthology.org/2026.emnlp-main.2503/", shape: [0.9, 0.52, 0.3, 0.35] },
    { name: "OmniReasoningBench", domain: "Joint Audio-Visual Reasoning", audio: "Audio · Video", eval: "Closed + Open", size: "1.2K", tasks: "2", year: 2026, description: "Selects questions that require complementary evidence from audio and vision.", url: "https://arxiv.org/abs/2609.39490", shape: [0.95, 0.44, 0.78, 0.82] },
    { name: "HIU-Bench", domain: "Skill- and Tool-Calling", audio: "Speech · Sound", eval: "Closed + Open", size: "1.4K", tasks: "56", year: 2026, description: "Evaluates the complete hear-invoke-understand loop for audio agents.", url: "https://arxiv.org/abs/2608.01881", shape: [0.94, 0.46, 0.76, 0.65] }
  ];

  const htmlCell = html => ({ html });
  const paperTables = {
    notation: {
      number: "TABLE I",
      caption: "Core notations used in this survey.",
      columns: ["Symbol", "Meaning"],
      open: true,
      rows: [
        [htmlCell("<b>𝐀</b> = {<b>𝐚</b><sub>t</sub>}<sub>t=1</sub><sup>T<sub>a</sub></sup>"), "Audio input or feature sequence"],
        [htmlCell("<b>𝐗</b> = {x<sub>n</sub>}<sub>n=1</sub><sup>N</sup>"), "Text instruction or prompt"],
        [htmlCell("<b>𝐕</b> = {<b>𝐯</b><sub>p</sub>}<sub>p=1</sub><sup>P</sup>"), "Visual input sequence"],
        [htmlCell("<b>𝐂</b>"), "Unified multimodal context"],
        [htmlCell("<b>𝐑</b> = {r<sub>k</sub>}<sub>k=1</sub><sup>K</sup>"), "Reasoning trajectory"],
        [htmlCell("<b>𝐘</b> = {y<sub>m</sub>}<sub>m=1</sub><sup>M</sup>"), "Text output"],
        [htmlCell("<b>𝐒</b> = {s<sub>ℓ</sub>}<sub>ℓ=1</sub><sup>L<sub>s</sub></sup>"), "Speech-token output"],
        [htmlCell("<b>𝐎</b>"), "Generic output, e.g., 𝐘 or 𝐒"],
        [htmlCell("<b>𝐀</b><sup>str</sup> = {<b>𝐀</b><sup>(c)</sup>}<sub>c=1</sub><sup>C<sub>a</sub></sup>"), "Streaming audio chunks"],
        [htmlCell("<b>𝐒</b><sup>str</sup> = {<b>𝐒</b><sub>t</sub>}<sub>t=1</sub><sup>C<sub>s</sub></sup>"), "Streaming speech chunks"],
        [htmlCell("<b>𝐑</b><sub>t</sub>"), "Reasoning state at step t"],
        [htmlCell("<b>𝐒</b><sub>t</sub>"), "Speech chunk at step t"]
      ]
    },
    rewards: {
      number: "TABLE II",
      caption: "Reward dimensions used by representative RL-based Audio-to-Text reasoning methods. Acc: Accuracy; Con: Consistency; Fmt: Format; Len: Length; Qual: Quality; Grd: Grounding; Ada: Adaptive.",
      columns: ["Model", "Acc", "Con", "Fmt", "Len", "Qual", "Grd", "Ada"],
      rows: [
        ["Step-Audio 2", "✓", "×", "×", "✓", "×", "✓", "×"],
        ["Audio-Thinker", "✓", "✓", "✓", "×", "✓", "×", "✓"],
        ["CESAR", "✓", "✓", "✓", "✓", "✓", "×", "×"],
        ["Omni-AutoThink", "✓", "×", "×", "×", "×", "×", "✓"],
        ["Covo-Audio", "✓", "✓", "✓", "×", "✓", "×", "×"],
        ["R1-AQA", "✓", "×", "✓", "×", "×", "×", "×"],
        ["Omni-R1", "✓", "×", "×", "×", "×", "×", "×"],
        ["Sheng et al.", "✓", "×", "×", "✓", "×", "×", "✓"],
        ["Wijngaard et al.", "✓", "×", "✓", "×", "×", "×", "✓"],
        ["SARI", "✓", "×", "✓", "×", "×", "×", "✓"],
        ["Omni-CLST", "✓", "×", "✓", "×", "×", "×", "✓"],
        ["AudioMCQ", "✓", "×", "×", "×", "×", "✓", "×"],
        ["AudSemThinker", "✓", "×", "✓", "✓", "×", "✓", "×"],
        ["Step-Audio R1", "✓", "×", "✓", "×", "×", "×", "×"],
        ["Audio-DeepThinker", "✓", "✓", "✓", "×", "✓", "×", "✓"],
        ["Audio-ReaPer", "✓", "×", "✓", "×", "×", "✓", "×"],
        ["AudioRubrics", "✓", "✓", "✓", "✓", "✓", "✓", "✓"],
        ["Echo", "✓", "✓", "✓", "×", "×", "✓", "×"],
        ["SightSound-R1", "✓", "×", "✓", "×", "×", "×", "×"]
      ]
    },
    a2tData: {
      number: "TABLE III",
      caption: "Summary of data and supervision settings for Audio-to-Text reasoning. ‘Eval’ denotes evaluation-only use without parameter updates.",
      columns: ["Model", "Source Data", "Reasoning Construction", "Training", "Grounding / Control", "Scale"],
      rows: [
        ["Audio-CoT", "MMAU (Eval)", "Prompt-based", "—", "Prompt elicitation", "—"],
        ["SAR-LM", "MMAU, MMAR, OmniBench (Eval)", "Symbolic audio description", "—", "Explicit symbolic features", "—"],
        ["SKAD", "Audio reasoning benchmarks (Eval)", "Acoustic sketch", "—", "Audio-contrastive decoding", "—"],
        ["Audio-Reasoner", "AudioSet, AudioCaps, + 7 others", "Gemini (structured 4-part)", "SFT", "Audio-aware filtering", "1.2M"],
        ["AF Sound-CoT", "AudioSkills, Clotho-AQA, + 10 others", "LLM–ALM collaborative (BFS/DFS)", "SFT", "LLM verification", "1.24M"],
        ["Audio-Cogito", "AudioSet, Clotho, AudioCaps, + 7 others", "Self-distillation", "SFT", "Omni-model teacher", "545K"],
        ["R1-AQA", "AVQA", "Direct answer", "GRPO", "Answer reward", "38K"],
        ["Omni-R1", "AVQA, VGGSound", "ChatGPT-generated QA", "GRPO", "Modality ablation", "38K–54K"],
        ["SARI", "AudioSet, MusicBench, MELD, AVQA", "Structured + unstructured CoT", "SFT+GRPO", "Difficulty curriculum", "42K"],
        ["Audio-Thinker", "AVQA", "Structured 4-part CoT", "SFT+GRPO", "Process reward", "40K"],
        ["AudioMCQ", "Clotho, AudioCaps, + 5 others", "—", "SFT+GRPO", "Audio-contribution filtering", "571K"],
        ["AudSemThinker", "YouTube closed captions", "Two-/three-phase semantics", "SFT+GRPO", "Auditory semantic extraction", "213K"],
        ["Omni-CLST", "AVQA, AudSemThinker data", "Guided thought dropout", "SFT+GRPO", "Difficulty-aware dropout", "249K"],
        ["Omni-AutoThink", "Audio-Reasoner, + multimodal", "Hierarchical calibration", "SFT+GRPO", "Adaptive reasoning budget", "571K"],
        ["Wijngaard et al.", "AVQA, ClothoAQA, + 4 others", "Direct answer; optional CoT", "SFT+GRPO", "Curriculum learning", "64K"],
        ["CESAR", "AVQA (augmented)", "—", "GRPO", "Consistency reward", "38K"],
        ["Step-Audio 2", "AudioSet, AudioCaps, + in-house", "LLM from mixing recipes", "SFT+RL", "Perception reward", "Large"],
        ["Step-Audio-R1", "ASR, paralinguistic, + in-house", "Self-distillation (MGRD)", "SFT+RLVR", "Grounded rollout selection", "5M"],
        ["EmotionThinker", "IEMOCAP, MELD, Expresso, + 2 others", "Prosody-enriched CoT", "SFT+GRPO", "Prosodic evidence", "35K"],
        ["SightSound-R1", "AVQA", "Distillation from teacher", "SFT+GRPO", "Audio-grounded fact verification", "40K"],
        ["SoundMind", "LogiQA 2.0-NLI (TTS)", "DeepSeek-R1", "SFT+RL", "Spoken logical premises", "6.4K"],
        ["PolyAudio", "AudioSet, LibriSpeech, + 5 others", "Multi-audio CoT", "SFT+GRPO", "Cross-clip evidence", "1.3M"],
        ["Audio-DeepThinker", "AVQA, AudioSet, + others", "DeepSeek-V3.1", "GRPO", "Process supervision", "69K"],
        ["Audio-ReaPer", "Perception-enhanced audio QA", "Perception-first trajectories", "SFT+RL", "Perceptual-density reward", "17.9K"],
        ["AudioRubrics", "Audio reasoning data", "Evolving per-sample rubrics", "RL", "Audio-grounded rubric reward", "40.1K"],
        ["AF3", "AudioSkills-XL, + 48 others", "Five-stage training", "SFT", "Answer-guided CoT + think suffix", "9.6M"],
        ["A2R", "HEAR + counterfactual negatives", "Speaker-attributed rationales", "SFT", "Counterfactual voice grounding", "2.4K"]
      ]
    },
    realtimeData: {
      number: "TABLE IV",
      caption: "Comparison of datasets and tasks in Real-Time Audio-to-Speech reasoning models. ‘(S)’ indicates TTS-synthesized versions of originally text-based datasets.",
      columns: ["Model", "Domain", "Source Data"],
      open: true,
      rows: [
        { group: "Thinking While Listening (Incremental and Retrospective Reasoning)" },
        ["Chronological Thinking", "Task-oriented Dialogue, Open-domain QA", "GenConv(S), SpokenWOZ(S), LlamaQ(S)"],
        ["SHANKS", "Math Reasoning", "Tulu3-Persona-Math-Grade(S)"],
        ["Shih et al.", "Common Sense & Math Reasoning", "COT COLLECTION(S)"],
        ["FLAIR", "Open-domain QA", "Synthetic dialogues (GPT-OSS/Qwen2.5/Llama3.1)"],
        ["RetroThinker", "Streaming Reasoning & Correction", "GSM8K (S)"],
        { group: "Thinking While Speaking (Controlled Interleaving and Atomic Consistency)" },
        ["MPS", "Math Reasoning, Complex Conversation", "Not disclosed"],
        ["STITCH", "Math Reasoning, Knowledge QA", "VoiceAssistant400K, Tulu-3-Persona(S), Natural Questions(S), TriviaQA(S)"],
        ["Mini-Omni-Reasoner", "Math Reasoning", "SPOKEN-MATH-PROBLEMS-3M"],
        ["ReEmpathy", "Empathetic Dialogue & Reflection", "EmotionTalk, OpenS2S subset"],
        ["InterRS", "Real-time General Reasoning", "K&K(S), MetaMath(S)"],
        ["Dual-Reasoner", "Streaming Reasoning", "Dual-Think-30k (S)"],
        ["Think-Aloud CoT", "Math Reasoning, Knowledge QA", "In-house spoken dialogues (not publicly released)"],
        ["RUBATO", "Math & Logical Reasoning", "Spoken GSM8K(S), Spoken BIG-Bench Hard(S), Overlapped Spoken GSM8K(S)"]
      ]
    },
    avMethods: {
      number: "TABLE V",
      caption: "Representative Audio-Visual reasoning methods and their principal grounding mechanisms.",
      columns: ["Model", "Principal Strategy", "Reasoning / Grounding Mechanism"],
      open: true,
      rows: [
        ["VITA", "Multi-stage SFT", "Joint audio-visual instruction tuning with modality-state control."],
        ["Qwen2.5-Omni", "SFT + DPO", "Interleaved omni-modal encoding with a Thinker–Talker architecture."],
        ["Qwen3-Omni", "SFT + distillation + GSPO", "Explicit thinking mode with task-dependent rule- and model-based rewards."],
        ["AV-Flamingo", "Curriculum SFT + GRPO", "Timestamp-grounded interleaved CoT for long and complex audio-visual streams."],
        ["OmniReasoning", "Data engine + MFSD", "Modality-factored evidence distillation and explicit audio–visual interaction."]
      ]
    },
    agentTradeoffs: {
      number: "TABLE VI",
      caption: "Key trade-offs between predefined-workflow and dynamic skill- and tool-calling audio agents.",
      columns: ["Dimension", "Predefined Workflow", "Dynamic Skill- and Tool-Calling"],
      open: true,
      rows: [
        ["Control flow", "Fixed at design time", "Decided at runtime by LLM"],
        ["Extensibility", "Low (requires redesign)", "High (plug-and-play tools)"],
        ["Interpretability", "High (predictable traces)", "Medium (depends on LLM’s reasoning chain)"],
        ["Native integration", "Usually pipeline-level modules", "External APIs or skills embedded in the speech model"],
        ["Streaming support", "Explicitly engineered in the workflow", "Architecture- and tool-dependent; native full-duplex is emerging"],
        ["Learned policy", "Uncommon; rules dominate", "Prompting, trajectory SFT, or multi-turn RL"],
        ["Latency", "Low to medium, depending on pipeline depth", "Architecture- and tool-dependent; calls may overlap with speech"],
        ["Execution reliability", "Predictable steps, bounded capabilities", "Tool selection, arguments, observations, and execution can fail separately"],
        ["Data/training needs", "Low to medium", "Medium to high for learned multi-turn coordination"],
        ["Suitable scenarios", "High-precision, structured tasks", "Open-domain, multi-tool collaboration"]
      ]
    },
    benchmarkOverview: {
      number: "TABLE VII",
      caption: "Overview of audio reasoning benchmarks. Open and closed denote open-ended and closed-ended evaluation types, respectively.",
      columns: ["Benchmark", "Domain", "Audio Type", "Eval Type", "Size", "#Tasks", "Year"],
      rows: benchmarks.map(item => [item.name, item.domain, item.audio.replaceAll(" · ", ", "), item.eval.replace(" + ", ", "), item.size, item.tasks, String(item.year)])
    }
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>'"]/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
  }

  function renderTableCell(value) {
    if (value && typeof value === "object" && "html" in value) return value.html;
    const text = String(value);
    const statusClass = text === "✓" ? " table-yes" : text === "×" ? " table-no" : "";
    return `<span class="${statusClass.trim()}">${escapeHTML(text)}</span>`;
  }

  function renderPaperTables() {
    document.querySelectorAll("[data-paper-table]").forEach(mount => {
      const table = paperTables[mount.dataset.paperTable];
      if (!table) return;
      const body = table.rows.map(row => {
        if (row.group) return `<tr class="paper-table-group"><th colspan="${table.columns.length}">${escapeHTML(row.group)}</th></tr>`;
        return `<tr>${row.map((cell, index) => `<${index === 0 ? "th" : "td"}${index === 0 ? ' scope="row"' : ""}>${renderTableCell(cell)}</${index === 0 ? "th" : "td"}>`).join("")}</tr>`;
      }).join("");
      mount.innerHTML = `<details class="paper-table-shell"${table.open ? " open" : ""}>
        <summary><span>${table.number}</span><b>${escapeHTML(table.caption)}</b><i>${table.rows.filter(row => !row.group).length} rows</i><em aria-hidden="true">+</em></summary>
        <div class="paper-table-scroll"><table><thead><tr>${table.columns.map(column => `<th scope="col">${escapeHTML(column)}</th>`).join("")}</tr></thead><tbody>${body}</tbody></table></div>
      </details>`;
    });
  }

  renderPaperTables();

  const monthNames = ["", "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  function taxDiagram(type) {
    if (type === "agent") {
      return `<div class="tax-diagram agent">
        <svg viewBox="0 0 430 280" aria-hidden="true"><path d="M160 140 C220 30 305 42 342 58"/><path d="M160 140 C230 140 280 140 342 140"/><path d="M160 140 C220 250 305 230 342 222"/></svg>
        <div class="tax-box tax-core">AFM PLANNER</div><div class="tax-box tool tool-one">AUDIO SKILL</div><div class="tax-box tool tool-two">SEARCH</div><div class="tax-box tool tool-three">ACTION</div>
      </div>`;
    }
    if (type === "av") {
      return `<div class="tax-diagram av"><div class="tax-box tax-in audio-input">AUDIO</div><div class="tax-box tax-in visual-input">VIDEO</div><div class="tax-flow flow-in"></div><div class="tax-flow flow-in flow-v"></div><div class="tax-box tax-core">ALIGN + REASON</div><span class="tax-reason"></span><div class="tax-flow flow-out"></div><div class="tax-box tax-out">ANSWER</div></div>`;
    }
    const output = type === "a2s" ? "SPEECH" : "TEXT";
    return `<div class="tax-diagram ${type}"><div class="tax-box tax-in">AUDIO</div><div class="tax-flow flow-in"></div><div class="tax-box tax-core">PERCEIVE + REASON</div><span class="tax-reason"></span><div class="tax-flow flow-out"></div><div class="tax-box tax-out">${output}</div></div>`;
  }

  function renderTaxonomy(type) {
    const item = taxonomy[type];
    document.getElementById("taxonomyNumber").textContent = item.number;
    document.getElementById("taxonomyName").textContent = item.name;
    document.getElementById("taxonomyDescription").textContent = item.description;
    document.getElementById("taxonomyAnimation").innerHTML = taxDiagram(type);
    document.getElementById("taxonomyBranches").innerHTML = item.branches.map(branch => `<span>${branch}</span>`).join("");
  }

  document.querySelectorAll(".taxonomy-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".taxonomy-tab").forEach(button => {
        const active = button === tab;
        button.classList.toggle("active", active);
        button.setAttribute("aria-selected", String(active));
      });
      renderTaxonomy(tab.dataset.taxonomy);
    });
  });
  renderTaxonomy("a2t");

  const timelineBoard = document.getElementById("timelineBoard");
  const paperCount = document.getElementById("paperCount");
  const popover = document.getElementById("paperPopover");
  let timelineFilter = "all";
  let timelineQuery = "";
  let pinnedPaper = false;
  let hidePopoverTimer;

  const timelineStartYear = 2023;
  const timelineEndYear = 2026;
  const timelineMonthWidth = 132;
  const timelineAxisOffset = 132;
  const timelineHeaderHeight = 102;
  const timelineLaneHeight = 144;
  const timelineLanes = ["a2t", "a2s", "av", "agent"];

  function renderTimeline() {
    const visible = papers.filter(paper => {
      const categoryMatch = timelineFilter === "all" || paper.category === timelineFilter;
      const haystack = `${paper.name} ${paper.title} ${paper.authors}`.toLowerCase();
      return categoryMatch && haystack.includes(timelineQuery);
    });
    const years = Array.from({ length: timelineEndYear - timelineStartYear + 1 }, (_, index) => timelineStartYear + index);
    const totalMonths = years.length * 12;
    const boardWidth = timelineAxisOffset + totalMonths * timelineMonthWidth + 32;
    const boardHeight = timelineHeaderHeight + timelineLanes.length * timelineLaneHeight + 18;

    const yearBands = years.map((year, index) => {
      const left = timelineAxisOffset + index * 12 * timelineMonthWidth;
      return `<div class="timeline-year-band" style="left:${left}px;width:${12 * timelineMonthWidth}px"><span>${year}</span></div>`;
    }).join("");

    const monthGrid = Array.from({ length: totalMonths }, (_, index) => {
      const month = index % 12 + 1;
      const left = timelineAxisOffset + index * timelineMonthWidth;
      const quarterClass = [1, 4, 7, 10].includes(month) ? " quarter-start" : "";
      return `<div class="timeline-month${quarterClass}" style="left:${left}px;width:${timelineMonthWidth}px" aria-hidden="true"><span>${monthNames[month]}</span><small>${String(month).padStart(2, "0")}</small><i></i></div>`;
    }).join("");

    const lanes = timelineLanes.map((category, index) => {
      const top = timelineHeaderHeight + index * timelineLaneHeight;
      return `<div class="timeline-lane" data-category="${category}" style="top:${top}px;height:${timelineLaneHeight}px;width:${boardWidth}px"><div class="timeline-lane-label"><i></i><span>${categoryNames[category]}</span></div></div>`;
    }).join("");

    const stackCounts = new Map();
    const nodes = visible
      .slice()
      .sort((a, b) => a.year - b.year || a.month - b.month || timelineLanes.indexOf(a.category) - timelineLanes.indexOf(b.category))
      .map(paper => {
        const monthIndex = (paper.year - timelineStartYear) * 12 + paper.month - 1;
        const laneIndex = timelineLanes.indexOf(paper.category);
        const stackKey = `${paper.year}-${paper.month}-${paper.category}`;
        const stackIndex = stackCounts.get(stackKey) || 0;
        stackCounts.set(stackKey, stackIndex + 1);
        const left = timelineAxisOffset + monthIndex * timelineMonthWidth + 8;
        const top = timelineHeaderHeight + laneIndex * timelineLaneHeight + 8 + stackIndex * 44;
        const index = papers.indexOf(paper);
        return `<button class="paper-node" type="button" style="left:${left}px;top:${top}px;width:${timelineMonthWidth - 16}px" data-paper-index="${index}" data-category="${paper.category}" aria-label="${paper.name}, ${monthNames[paper.month]} ${paper.year}. Open paper details"><span>${monthNames[paper.month]} ${paper.year}</span><strong>${paper.name}</strong></button>`;
      }).join("");

    timelineBoard.style.width = `${boardWidth}px`;
    timelineBoard.style.height = `${boardHeight}px`;
    timelineBoard.innerHTML = `${yearBands}${monthGrid}${lanes}${nodes}`;
    paperCount.textContent = `${visible.length} paper${visible.length === 1 ? "" : "s"} shown`;
    bindPaperNodes();
  }

  function positionPopover(node) {
    const rect = node.getBoundingClientRect();
    const width = Math.min(380, window.innerWidth - 30);
    const left = Math.max(15, Math.min(rect.left, window.innerWidth - width - 15));
    const desiredTop = rect.bottom + 12;
    const top = desiredTop + 270 > window.innerHeight ? Math.max(15, rect.top - 270) : desiredTop;
    popover.style.left = `${left}px`;
    popover.style.top = `${top}px`;
  }

  function showPaper(index, node, pin = false) {
    clearTimeout(hidePopoverTimer);
    const paper = papers[index];
    if (!paper) return;
    pinnedPaper = pin;
    timelineBoard.classList.add("has-focus");
    timelineBoard.querySelectorAll(".paper-node").forEach(item => item.classList.toggle("active", item === node));
    document.getElementById("popoverCategory").textContent = `${categoryNames[paper.category]} · ${monthNames[paper.month]} ${paper.year}`;
    document.getElementById("popoverTitle").textContent = paper.title;
    document.getElementById("popoverAuthors").textContent = paper.authors;
    document.getElementById("popoverDate").textContent = `${monthNames[paper.month]} ${paper.year}`;
    const link = document.getElementById("popoverLink");
    link.href = paper.url;
    positionPopover(node);
    popover.classList.add("open");
    popover.setAttribute("aria-hidden", "false");
  }

  function hidePaper(force = false) {
    if (pinnedPaper && !force) return;
    pinnedPaper = false;
    popover.classList.remove("open");
    popover.setAttribute("aria-hidden", "true");
    timelineBoard.classList.remove("has-focus");
    timelineBoard.querySelectorAll(".paper-node").forEach(item => item.classList.remove("active"));
  }

  function bindPaperNodes() {
    timelineBoard.querySelectorAll(".paper-node").forEach(node => {
      const index = Number(node.dataset.paperIndex);
      node.addEventListener("mouseenter", () => showPaper(index, node));
      node.addEventListener("focus", () => showPaper(index, node));
      node.addEventListener("mouseleave", () => { hidePopoverTimer = setTimeout(() => hidePaper(), 140); });
      node.addEventListener("blur", () => { hidePopoverTimer = setTimeout(() => hidePaper(), 140); });
      node.addEventListener("click", () => showPaper(index, node, true));
    });
  }

  document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(item => item.classList.toggle("active", item === button));
      timelineFilter = button.dataset.filter;
      hidePaper(true);
      renderTimeline();
    });
  });
  document.getElementById("timelineSearch").addEventListener("input", event => {
    timelineQuery = event.target.value.trim().toLowerCase();
    hidePaper(true);
    renderTimeline();
  });
  popover.addEventListener("mouseenter", () => clearTimeout(hidePopoverTimer));
  popover.addEventListener("mouseleave", () => { if (!pinnedPaper) hidePaper(); });
  popover.querySelector(".popover-close").addEventListener("click", () => hidePaper(true));
  window.addEventListener("resize", () => hidePaper(true));
  document.addEventListener("keydown", event => { if (event.key === "Escape") hidePaper(true); });
  renderTimeline();

  const viewport = document.getElementById("timelineViewport");
  let dragging = false;
  let dragStart = 0;
  let scrollStart = 0;
  viewport.addEventListener("pointerdown", event => {
    if (event.target.closest("button")) return;
    dragging = true;
    dragStart = event.clientX;
    scrollStart = viewport.scrollLeft;
    viewport.classList.add("dragging");
    viewport.setPointerCapture(event.pointerId);
  });
  viewport.addEventListener("pointermove", event => {
    if (!dragging) return;
    viewport.scrollLeft = scrollStart - (event.clientX - dragStart);
  });
  viewport.addEventListener("pointerup", () => { dragging = false; viewport.classList.remove("dragging"); });
  viewport.addEventListener("pointercancel", () => { dragging = false; viewport.classList.remove("dragging"); });
  document.querySelectorAll("[data-year-jump]").forEach(button => {
    button.addEventListener("click", () => {
      const year = Number(button.dataset.yearJump);
      const left = (year - timelineStartYear) * 12 * timelineMonthWidth + timelineAxisOffset - 24;
      viewport.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
      document.querySelectorAll("[data-year-jump]").forEach(item => item.classList.toggle("active", item === button));
    });
  });

  const benchmarkList = document.getElementById("benchmarkList");
  benchmarkList.innerHTML = benchmarks.map((item, index) => `<button class="benchmark-item${index === 0 ? " active" : ""}" type="button" role="option" aria-selected="${index === 0}" data-benchmark-index="${index}"><span>${item.domain.toUpperCase()}</span><b>${item.name}</b><i></i></button>`).join("");

  function polygonPoints(values) {
    const center = 120;
    const maxRadius = 88;
    return values.map((value, index) => {
      const angle = -Math.PI / 2 + index * (Math.PI * 2 / values.length);
      const radius = 25 + value * (maxRadius - 25);
      return `${(center + Math.cos(angle) * radius).toFixed(1)},${(center + Math.sin(angle) * radius).toFixed(1)}`;
    }).join(" ");
  }

  function selectBenchmark(index) {
    const item = benchmarks[index];
    document.querySelectorAll(".benchmark-item").forEach((button, buttonIndex) => {
      const active = buttonIndex === index;
      button.classList.toggle("active", active);
      button.setAttribute("aria-selected", String(active));
    });
    document.getElementById("benchmarkDomain").textContent = item.domain.toUpperCase();
    document.getElementById("benchmarkName").textContent = item.name;
    document.getElementById("benchmarkDescription").textContent = item.description;
    document.getElementById("benchmarkAudio").textContent = item.audio;
    document.getElementById("benchmarkEval").textContent = item.eval;
    document.getElementById("benchmarkSize").textContent = item.size;
    document.getElementById("benchmarkTasks").textContent = item.tasks;
    document.getElementById("benchmarkLink").href = item.url;
    document.getElementById("benchmarkShape").setAttribute("points", polygonPoints(item.shape));
  }
  benchmarkList.querySelectorAll(".benchmark-item").forEach(button => button.addEventListener("click", () => selectBenchmark(Number(button.dataset.benchmarkIndex))));
  selectBenchmark(0);

  document.querySelectorAll("[data-paradigm-card] header button").forEach(button => {
    button.addEventListener("click", () => {
      const card = button.closest("[data-paradigm-card]");
      const visual = card.querySelector(".paradigm-figure");
      if (!visual) return;
      const clone = visual.cloneNode(true);
      visual.replaceWith(clone);
    });
  });

  const progressBar = document.getElementById("readingProgress");
  const progressCurrent = document.getElementById("progressCurrent");
  const progressLinks = [...document.querySelectorAll("[data-progress-link]")];
  const progressSections = progressLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  let activeProgressId = "";
  let progressTicking = false;

  function stickyOffset() {
    return (document.querySelector(".topbar")?.offsetHeight || 0) + (progressBar?.offsetHeight || 0);
  }

  function updateReadingProgress() {
    progressTicking = false;
    const threshold = stickyOffset() + Math.min(180, window.innerHeight * 0.28);
    let activeSection = progressSections[0];
    progressSections.forEach(section => {
      if (section.getBoundingClientRect().top <= threshold) activeSection = section;
    });
    if (!activeSection || activeSection.id === activeProgressId) return;
    activeProgressId = activeSection.id;
    progressLinks.forEach((link, index) => {
      const active = link.getAttribute("href") === `#${activeSection.id}`;
      link.classList.toggle("active", active);
      link.setAttribute("aria-current", active ? "location" : "false");
      if (active) {
        progressCurrent.textContent = String(index + 1).padStart(2, "0");
        const container = link.parentElement;
        const left = link.offsetLeft - container.clientWidth / 2 + link.offsetWidth / 2;
        container.scrollTo({ left: Math.max(0, left), behavior: "auto" });
      }
    });
  }

  window.addEventListener("scroll", () => {
    if (progressTicking) return;
    progressTicking = true;
    window.requestAnimationFrame(updateReadingProgress);
  }, { passive: true });
  window.addEventListener("resize", updateReadingProgress);
  updateReadingProgress();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach(element => revealObserver.observe(element));

  const motionToggle = document.getElementById("motionToggle");
  motionToggle.addEventListener("click", () => {
    const paused = document.body.classList.toggle("motion-paused");
    motionToggle.setAttribute("aria-pressed", String(paused));
    motionToggle.setAttribute("aria-label", paused ? "Resume animations" : "Pause animations");
    motionToggle.innerHTML = paused
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z"/></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
  });

  const authorDialog = document.getElementById("authorDialog");
  document.getElementById("showAuthors").addEventListener("click", () => authorDialog.showModal());
  authorDialog.querySelector(".dialog-close").addEventListener("click", () => authorDialog.close());
  const figureDialog = document.getElementById("figureDialog");
  document.querySelectorAll("[data-figure]").forEach(button => {
    button.addEventListener("click", () => {
      const image = document.getElementById("figureDialogImage");
      image.src = button.dataset.figure;
      image.alt = button.dataset.caption;
      document.getElementById("figureDialogCaption").textContent = button.dataset.caption;
      figureDialog.showModal();
    });
  });
  figureDialog.querySelector(".dialog-close").addEventListener("click", () => figureDialog.close());
  [authorDialog, figureDialog].forEach(dialog => dialog.addEventListener("click", event => {
    const rect = dialog.getBoundingClientRect();
    const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!inside) dialog.close();
  }));

  const toast = document.getElementById("toast");
  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => toast.classList.remove("show"), 1800);
  }
  async function copyText(text, message = "Copied") {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      const area = document.createElement("textarea");
      area.value = text;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    }
    showToast(message);
  }
  const bibtex = document.getElementById("bibtexBlock").innerText;
  document.getElementById("copyBibtex").addEventListener("click", () => copyText(bibtex, "BibTeX copied"));
  document.getElementById("citeButton").addEventListener("click", () => copyText(bibtex, "BibTeX copied"));
  document.getElementById("copyConfigPath").addEventListener("click", () => copyText("site/config.js", "Config path copied"));

  function configureLinks() {
    const githubUrl = config.githubUrl || (config.repository ? `https://github.com/${config.repository}` : "");
    [document.getElementById("githubLink"), document.getElementById("footerGithub")].forEach(link => {
      if (githubUrl) {
        link.href = githubUrl;
        link.target = "_blank";
        link.rel = "noreferrer";
      }
    });
    if (config.paperUrl) {
      const paperLink = document.getElementById("paperLink");
      paperLink.href = config.paperUrl;
      paperLink.classList.remove("is-hidden");
    }
    document.getElementById("lastUpdated").textContent = config.lastUpdated || "NOV 2026";
    const discussionLink = document.getElementById("discussionLink");
    if (githubUrl) discussionLink.href = `${githubUrl}/discussions`;
    else discussionLink.style.display = "none";
  }

  function mountGiscus() {
    const ready = config.repository && config.repositoryId && config.discussionCategoryId;
    if (!ready) return;
    document.getElementById("discussionSetup").remove();
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attributes = {
      repo: config.repository,
      "repo-id": config.repositoryId,
      category: config.discussionCategory || "Q&A",
      "category-id": config.discussionCategoryId,
      mapping: "pathname",
      strict: "0",
      "reactions-enabled": "1",
      "emit-metadata": "0",
      "input-position": "top",
      theme: "noborder_dark",
      lang: "en",
      loading: "lazy"
    };
    Object.entries(attributes).forEach(([name, value]) => script.setAttribute(`data-${name}`, value));
    document.getElementById("giscusMount").appendChild(script);
  }

  configureLinks();
  mountGiscus();

  // Keep deep links reliable after dynamic content, fonts, and images are mounted.
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  function alignDeepLink() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (!target) return;
      const previousBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      const top = target.getBoundingClientRect().top + window.scrollY - stickyOffset();
      window.scrollTo(0, Math.max(0, top));
      document.documentElement.style.scrollBehavior = previousBehavior;
      updateReadingProgress();
    }
  }
  window.setTimeout(alignDeepLink, 120);
  window.addEventListener("load", () => window.setTimeout(alignDeepLink, 420), { once: true });
})();
