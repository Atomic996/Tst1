
import React, { useState } from 'react';
import { ProjectType } from '../types';
import { PROJECTS } from '../constants';
import { GeminiService } from '../services/geminiService';

const gemini = new GeminiService();

const ContentGenerator: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectType>(ProjectType.CODEX);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');

  const project = PROJECTS[selectedProject];

  const handleGenerateText = async () => {
    setIsGenerating(true);
    setGeneratedText('');
    const text = await gemini.generateTweet(project);
    setGeneratedText(text);
    setIsGenerating(false);
  };

  const handleGenerateImage = async () => {
    setIsGenerating(true);
    setGeneratedImage(null);
    const img = await gemini.generateProjectImage(project, customPrompt || 'The project in a high-tech setting');
    setGeneratedImage(img);
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (!generatedText) return;
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handlePublish = () => {
    if (!generatedText) return;
    // Twitter Web Intent: Safe way to share content without exposing API Keys in frontend
    const tweetText = encodeURIComponent(generatedText);
    const url = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="p-4 space-y-6 animate-fadeIn">
      {/* Project Selector */}
      <div className="flex bg-zinc-900/50 p-1 rounded-xl border border-zinc-800">
        <button 
          onClick={() => setSelectedProject(ProjectType.CODEX)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${selectedProject === ProjectType.CODEX ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500'}`}
        >
          Codex
        </button>
        <button 
          onClick={() => setSelectedProject(ProjectType.BULK_TRADE)}
          className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${selectedProject === ProjectType.BULK_TRADE ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500'}`}
        >
          Bulk Trade
        </button>
      </div>

      {/* Project Card */}
      <div className="bg-zinc-900 rounded-2xl p-5 border border-zinc-800 relative overflow-hidden group">
        <div className={`absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 pointer-events-none ${selectedProject === ProjectType.CODEX ? 'bg-blue-500' : 'bg-green-500'}`}></div>
        <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
          {selectedProject} 
          <span className="text-[10px] bg-zinc-800 px-2 py-0.5 rounded text-zinc-400 font-normal">Active Project</span>
        </h2>
        <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.keyFeatures.slice(0, 3).map((f, i) => (
            <span key={i} className="text-[10px] bg-zinc-800/50 text-zinc-300 px-2 py-1 rounded-full border border-zinc-700/50">
              {f}
            </span>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Custom Direction</label>
          <textarea 
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            placeholder="Add context or specific campaign ideas..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all h-24 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            disabled={isGenerating}
            onClick={handleGenerateText}
            className="bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Drafting...
              </span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                Draft Post
              </>
            )}
          </button>
          <button 
             disabled={isGenerating}
             onClick={handleGenerateImage}
             className="bg-white hover:bg-zinc-200 text-black py-3 px-4 rounded-xl font-bold text-sm transition-all disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                 <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                 Generating...
              </span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                AI Visual
              </>
            )}
          </button>
        </div>
      </div>

      {/* Result Display */}
      {(generatedText || generatedImage) && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden animate-slideUp">
          <div className="p-3 bg-zinc-800/50 border-b border-zinc-800 flex justify-between items-center">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">AI Result Preview</span>
            <button onClick={() => { setGeneratedText(''); setGeneratedImage(null); }} className="text-zinc-500 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="p-5">
            {generatedImage && (
              <img src={generatedImage} alt="Generated" className="w-full rounded-xl mb-4 shadow-xl border border-zinc-800 transition-transform hover:scale-[1.02]" />
            )}
            {generatedText && (
              <p className="text-zinc-300 text-sm whitespace-pre-wrap leading-relaxed bg-black/30 p-4 rounded-xl border border-zinc-800/50 mb-4">{generatedText}</p>
            )}
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className={`flex-1 ${copyStatus === 'copied' ? 'bg-green-600' : 'bg-zinc-800'} hover:opacity-90 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2`}
              >
                {copyStatus === 'copied' ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    Copy Text
                  </>
                )}
              </button>
              <button 
                onClick={handlePublish}
                className="flex-[1.5] bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
                Publish to X
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
