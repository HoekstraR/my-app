import React from 'react';
import { MessageCircle, ArrowLeft } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-50 to-gray-50">
      <main className="px-6">
        <div className="max-w-4xl mx-auto py-16">
          
          {/* Hero section - integrated into the site */}
          <div className="text-center mb-20">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">This is Your Digital Canvas</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform it into any web application you can imagine using the chat on the left
            </p>
            
            {/* Primary CTA - pointing left */}
            <div className="flex items-center justify-center space-x-3 bg-blue-600 text-white py-4 px-8 rounded-xl max-w-md mx-auto mb-12">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Start chatting now</span>
            </div>
          </div>
          
          {/* How it works */}
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">1. Chat About Your Idea</h4>
                <p className="text-gray-600">Just talk to our AI like you would a friend. Describe what you want to create.</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <div className="w-6 h-6 text-green-600">✨</div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">2. Watch It Transform</h4>
                <p className="text-gray-600">See your application come to life instantly. Don&apos;t like something? Just ask for changes!</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <div className="w-6 h-6 text-purple-600">📁</div>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">3. Take It With You</h4>
                <p className="text-gray-600">When you&apos;re happy, download your creation and use it anywhere you want!</p>
              </div>
            </div>
          </div>

          {/* Examples to spark imagination */}
          <div className="text-center mb-20">
            <p className="text-blue-800 font-medium mb-6 text-lg">💬 Try saying:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🥖</div>
                <p className="text-blue-700 italic">&quot;Turn this into a bakery website with online ordering&quot;</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl mb-2">📸</div>
                <p className="text-green-700 italic">&quot;Make this my portfolio to showcase my photography&quot;</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl mb-2">🛍️</div>
                <p className="text-purple-700 italic">&quot;I want to sell handmade jewelry online&quot;</p>
              </div>
            </div>
          </div>

          
          {/* Final CTA - repeat the primary action */}
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start?</h3>
              <p className="text-gray-600 mb-6">
                Your next digital creation is just a conversation away
              </p>
              
              <div className="flex items-center justify-center space-x-4 bg-blue-600 text-white py-4 px-8 rounded-xl">
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">Open chat and describe your idea</span>
                <ArrowLeft className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;