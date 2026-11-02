import React, { useState } from 'react';
import { Terminal, Shield, Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

export default function HeroTerminal({ terminalData }) {
  const [copied, setCopied] = useState(false);
  const [customHistory, setCustomHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');

  const commandLines = terminalData?.commandLines || [
    { cmd: "whoami", output: "student_developer && algorithm_craftsman" },
    { cmd: "ls -la skills/", output: "drwxr-xr-x 4 dev staff 128 Nov 02 18:00 c++20_dsa/\n-rw-r--r-- 1 dev staff 2048 Nov 02 18:00 segment_tree.cpp\n-rw-r--r-- 1 dev staff 1024 Nov 02 18:00 dinic_max_flow.cpp\n-rw-r--r-- 1 dev staff 4096 Nov 02 18:00 threejs_shaders.glsl" },
    { cmd: "cat status.json", output: "{\n  \"status\": \"ACTIVE_RESEARCH\",\n  \"focus\": [\"Competitive Programming\", \"Robotics Digital Twin\", \"Web3D Integration\"],\n  \"rigour\": \"Stanford CS97SI (10^8 ops/sec)\"\n}" },
  ];

  const handleCopySnippet = () => {
    const text = commandLines.map(c => `$ ${c.cmd}\n${c.output}`).join('\n\n');
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCommand = (cmdText) => {
    const cleanCmd = cmdText.trim().toLowerCase();
    let reply = "";

    switch (cleanCmd) {
      case 'help':
        reply = "Available commands: 'whoami', 'stack', 'dsa', 'web3d', 'projects', 'status', 'c++', 'clear'";
        break;
      case 'whoami':
        reply = "student_developer | Competitive Programming & Web3D Systems";
        break;
      case 'stack':
        reply = "Languages: C++20 (GCC/Clang), Python 3.12, JavaScript (ES2024)\nGraphics: Three.js WebGL, Shaders GLSL\nFrameworks: React 18, Tailwind CSS, Vite\nHardware/IoT: ESP32, JetBot Differential Drive, LiDAR";
        break;
      case 'dsa':
        reply = "C++20 Competitive Programming Toolkit:\n- Segment Tree with Lazy Propagation O(log N)\n- Fenwick Tree (Binary Indexed Tree) O(log N)\n- Dinic Max Flow O(V^2 * E)\n- LCA Binary Lifting O(N log N) preprocess, O(log N) query\n- Disjoint Set Union (DSU) with Path Compression O(alpha(N))\n- Stanford CS97SI constraints (10^8 ops/sec, Fast I/O)";
        break;
      case 'web3d':
        reply = "Web3D Integration Patterns:\n- Layered separation: Canvas background + Accessible DOM UI\n- Dynamic DPR clamp (Math.min(devicePixelRatio, 1.75))\n- Page Visibility API & IntersectionObserver render throttling\n- Full WebGL memory disposal on unmount";
        break;
      case 'projects':
        reply = "1. SafeIron AI: Computer Vision Thermal Iron Inspection\n2. JetBot Simulation: Differential Drive Robotics Digital Twin\n3. DSA & CP Toolkit: C++20 Competitive Programming Algorithms\n4. VLI-10 Lab: Interactive Physics & Optical Virtual Experiments";
        break;
      case 'status':
        reply = "ACTIVE: Investigating tree decomposition, robotics kinematics and high-performance WebGL.";
        break;
      case 'c++':
        reply = "#include <iostream>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    cout << \"Mastering C++ Algorithms x Futuristic Web3D\\n\";\n    return 0;\n}";
        break;
      case 'clear':
        setCustomHistory([]);
        setInputVal('');
        return;
      default:
        reply = `bash: command not found: ${cleanCmd}. Type 'help' for available commands.`;
    }

    setCustomHistory(prev => [...prev, { cmd: cmdText, output: reply }]);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      handleRunCommand(inputVal);
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-[#0A0A0E] border border-white/[0.08] shadow-[0_16px_48px_-8px_rgba(0,0,0,0.9)] font-mono text-xs flex flex-col h-[460px] sm:h-[520px]">
      {/* macOS Terminal Title Bar */}
      <div className="bg-[#121218] px-4 py-3 border-b border-white/[0.08] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          {/* macOS 3 Window Controls */}
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] inline-block" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] inline-block" />
          </div>
          <span className="text-[11px] font-medium text-[#AAA7B2] ml-2 tracking-wide">
            developer@portfolio:~
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySnippet}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#181822] hover:bg-[#222230] text-[#AAA7B2] hover:text-[#F5F4F8] border border-white/[0.06] transition-colors text-[10px]"
            title="Sao chép log terminal"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#9B5CFF]" />
                <span className="text-[#B994FF]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Content Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-[#0A0A0E] text-[#F5F4F8] text-left">
        {/* Startup Logs */}
        {commandLines.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-[#9B5CFF] select-none">developer@portfolio:~$</span>
              <span className="text-[#F5F4F8]">{item.cmd}</span>
            </div>
            <div className="pl-4 text-[#AAA7B2] leading-relaxed whitespace-pre-wrap font-mono text-[11px] sm:text-xs">
              {item.output}
            </div>
          </div>
        ))}

        {/* User Interactive History */}
        {customHistory.map((item, idx) => (
          <div key={`hist-${idx}`} className="space-y-1 border-t border-white/[0.05] pt-2">
            <div className="flex items-center gap-2 font-semibold">
              <span className="text-[#9B5CFF] select-none">developer@portfolio:~$</span>
              <span className="text-[#F5F4F8]">{item.cmd}</span>
            </div>
            <div className="pl-4 text-[#B994FF] leading-relaxed whitespace-pre-wrap bg-[#121218] p-2.5 rounded-lg border border-white/[0.06] font-mono text-[11px] sm:text-xs">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Interactive Command Suggestion Chips */}
      <div className="px-4 py-2 bg-[#0E0E14] border-t border-white/[0.06] flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] text-[#706D79] uppercase tracking-wider mr-1">Quick:</span>
        {['whoami', 'stack', 'dsa', 'web3d', 'projects', 'c++', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className="px-2 py-0.5 rounded bg-[#161620] hover:bg-[#9B5CFF] hover:text-white border border-white/[0.06] text-[10px] text-[#AAA7B2] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Interactive Command Input Line */}
      <div className="p-3 bg-[#121218] border-t border-white/[0.08] flex items-center gap-2">
        <span className="text-[#9B5CFF] font-bold select-none text-xs">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập 'help' hoặc click nút lệnh trên..."
          className="flex-1 bg-transparent border-none outline-none text-[#F5F4F8] placeholder:text-[#706D79] text-xs font-mono"
        />
        <button
          onClick={() => inputVal.trim() && handleRunCommand(inputVal)}
          disabled={!inputVal.trim()}
          className="p-1.5 rounded-lg bg-[#9B5CFF] disabled:bg-[#1A1A22] text-white hover:bg-[#B994FF] transition-colors disabled:cursor-not-allowed shadow-glow-purple"
          title="Thực thi lệnh"
        >
          <Play className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
