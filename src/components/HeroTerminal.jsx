import React, { useState } from 'react';
import { Terminal, Shield, Play, RotateCcw, Copy, Check, Sparkles } from 'lucide-react';

export default function HeroTerminal({ terminalData }) {
  const [copied, setCopied] = useState(false);
  const [customHistory, setCustomHistory] = useState([]);
  const [inputVal, setInputVal] = useState('');

  const commandLines = terminalData?.commandLines || [
    { cmd: "whoami", output: "student_developer && algorithm_craftsman" },
    { cmd: "core_stack", output: "['C++20 (DSA / CP)', 'Three.js / WebGL', 'Python 3.12', 'React 18']" },
    { cmd: "focus_areas", output: "['Competitive Programming', 'Spatial Graphics & Simulation', 'System Architecture']" },
    { cmd: "current_status", output: "Refining algorithmic rigour & vintage editorial portfolio..." },
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
        reply = "Commands: 'stack', 'dsa', 'web3d', 'projects', 'status', 'c++', 'arch', 'clear'";
        break;
      case 'stack':
        reply = "C++20 (GCC/Clang), Python 3.12, Three.js WebGL, React 18, Tailwind CSS";
        break;
      case 'dsa':
        reply = "C++20 DSA & CP Toolkit:\n- Segment Tree w/ Lazy Propagation O(log N)\n- Fenwick Tree (BIT) O(log N)\n- Dinic Max Flow O(V^2 * E)\n- LCA Binary Lifting O(N log N) prep, O(log N) query\n- Stanford CS97SI constraints (10^8 ops/sec)";
        break;
      case 'web3d':
        reply = "Web3D Integration Patterns:\n- Pattern 1: Layered separation (Three.js canvas + DOM UI)\n- DPR clamp <= 1.75\n- Page Visibility API & IntersectionObserver throttling\n- Complete WebGL resource disposal on unmount";
        break;
      case 'projects':
        reply = "1. DSA & CP Toolkit (C++20)\n2. SafeIron AI (Thermal Inspection)\n3. JetBot Simulation (Robotics Web3D)\n4. VLI-10 Lab (Optics & Physics)";
        break;
      case 'status':
        reply = "ACTIVE: Exploring advanced algorithms & crafting tactile digital experiences.";
        break;
      case 'c++':
        reply = "#include <iostream>\nint main() {\n  std::ios_base::sync_with_stdio(false);\n  std::cout << \"Editorial Craft x Algorithmic Rigour\\n\";\n  return 0;\n}";
        break;
      case 'arch':
        reply = "Architecture: Vintage Editorial typography (Instrument Serif + Inter) + Interactive 3D (Three.js PBR) + Modular project development journals.";
        break;
      case 'clear':
        setCustomHistory([]);
        setInputVal('');
        return;
      default:
        reply = `Command not recognized: '${cleanCmd}'. Type 'help' for available commands.`;
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
    <div className="w-full rounded-2xl overflow-hidden bg-white border border-[#D8D5CD] shadow-editorial font-mono text-xs flex flex-col h-[460px] sm:h-[520px]">
      {/* Editorial Terminal Header */}
      <div className="bg-[#F7F5F0] px-4 py-3 border-b border-[#D8D5CD] flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#171717]/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#66645F]/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#D8D5CD]" />
          </div>
          <span className="text-[11px] font-semibold text-[#171717] ml-2">
            workspace@dev-editorial: ~/portfolio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySnippet}
            className="flex items-center gap-1 px-2 py-1 rounded bg-white hover:bg-[#F0EEE8] text-[#66645F] hover:text-[#171717] border border-[#D8D5CD] transition-colors text-[10px]"
            title="Sao chép nội dung log"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[#304FFE]" />
                <span className="text-[#304FFE]">Copied</span>
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
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-white text-[#171717] text-left">
        {/* Default Startup Lines */}
        {commandLines.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-[#304FFE] font-semibold">
              <span className="text-[#66645F] select-none">$</span>
              <span>{item.cmd}</span>
            </div>
            <div className="pl-4 text-[#66645F] leading-relaxed whitespace-pre-wrap">
              {item.output}
            </div>
          </div>
        ))}

        {/* User Interactive History */}
        {customHistory.map((item, idx) => (
          <div key={`hist-${idx}`} className="space-y-1 border-t border-[#F0EEE8] pt-2">
            <div className="flex items-center gap-2 text-[#304FFE] font-semibold">
              <span className="text-[#66645F] select-none">$</span>
              <span>{item.cmd}</span>
            </div>
            <div className="pl-4 text-[#171717] leading-relaxed whitespace-pre-wrap bg-[#F7F5F0] p-2 rounded border border-[#E7E4DC]">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Interactive Command Suggestion Chips */}
      <div className="px-4 py-2 bg-[#F7F5F0] border-t border-[#D8D5CD] flex flex-wrap gap-1.5 items-center">
        <span className="text-[10px] text-[#66645F] uppercase tracking-wider mr-1">Quick:</span>
        {['stack', 'dsa', 'web3d', 'projects', 'c++', 'clear'].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleRunCommand(cmd)}
            className="px-2 py-0.5 rounded bg-white hover:bg-[#304FFE] hover:text-white border border-[#D8D5CD] text-[10px] text-[#66645F] transition-colors"
          >
            {cmd}
          </button>
        ))}
      </div>

      {/* Interactive Command Input Line */}
      <div className="p-3 bg-white border-t border-[#D8D5CD] flex items-center gap-2">
        <span className="text-[#304FFE] font-bold select-none">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập 'help' hoặc click nút lệnh trên..."
          className="flex-1 bg-transparent border-none outline-none text-[#171717] placeholder:text-[#8E8B83] text-xs font-mono"
        />
        <button
          onClick={() => inputVal.trim() && handleRunCommand(inputVal)}
          disabled={!inputVal.trim()}
          className="p-1.5 rounded bg-[#171717] disabled:bg-[#D8D5CD] text-white hover:bg-[#304FFE] transition-colors disabled:cursor-not-allowed"
          title="Thực thi lệnh"
        >
          <Play className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
