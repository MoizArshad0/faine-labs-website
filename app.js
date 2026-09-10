/**
 * Faine Labs - Interactive UI & Automation Sandbox Engine
 * AI Lead Response & Revenue Automation for Roofing Companies
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAIChatDemo();
  initSMSWorkflowDemo();
  initDashboardTicker();
  initModals();
  initForms();
  initFloatingWidget();
  initCurrentYear();
  lucide.createIcons();
});

/* ==========================================================================
   1. Navbar & Mobile Menu
   ========================================================================== */
function initNavbar() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
      mobileMenu.classList.toggle('hidden');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (!mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Glass navbar scroll effect
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-lg', 'bg-black/95');
    } else {
      navbar.classList.remove('shadow-lg');
    }
  });
}

/* ==========================================================================
   2. Interactive AI Chatbot Demo Simulator
   ========================================================================== */
function initAIChatDemo() {
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const promptChips = document.querySelectorAll('.chat-chip');
  const resetChatBtn = document.getElementById('resetChatBtn');

  const cannedKnowledge = [
    {
      keywords: ['price', 'pricing', 'cost', '299', 'package', 'plan', 'fee'],
      response: "Our complete **Revenue Automation** system is **$299/month flat** with no long-term contracts. It includes 24/7 instant lead response, sub-3s missed-call text-back, project qualification, automated estimate follow-up, inspection booking, review automation, and pipeline organization. Would you like to schedule a 15-minute demo to see it live?"
    },
    {
      keywords: ['missed call', 'missed-call', 'text-back', 'missed', 'call', 'phone', 'recovery', 'on a roof'],
      response: "When a homeowner calls and your team misses it (e.g. while crews are on a roof or after hours), Faine Labs triggers an instant personalized SMS in under 3 seconds (*'Hi! Sorry we missed your call—we are currently with a customer. How can we help you today?'*). This starts the conversation immediately before the homeowner calls another contractor!"
    },
    {
      keywords: ['storm', 'hail', 'wind', 'insurance', 'claim', 'restoration', 'tarp', 'leak'],
      response: "Yes! The system is specifically trained for storm damage and insurance restoration workflows. When severe hail or wind hits, the AI collects storm dates, damage severity, leak locations, and insurance carrier info before scheduling an on-site inspection for your estimating team."
    },
    {
      keywords: ['book', 'schedule', 'demo', 'consult', 'appointment', 'time', 'walkthrough'],
      response: "We would be glad to show you a live 15-minute demonstration tailored specifically to your company! Click **'Book a Free 15-Minute Demo'** to pick a time that works best for your team."
    },
    {
      keywords: ['services', 'features', 'offer', 'automations', 'system', 'crm', 'pipeline', 'included'],
      response: "Faine Labs builds 8 core revenue automations: 1) Instant Lead Response, 2) Missed Call Recovery, 3) AI Lead Qualification, 4) Automated Follow-Up, 5) Inspection Booking, 6) Lead Nurturing, 7) Review Automation, and 8) Pipeline Automation. Together, they turn unanswered inquiries into booked inspections and closed contracts."
    },
    {
      keywords: ['roofing', 'contractor', 'residential', 'commercial', 'replacement', 'repair', 'niche', 'only', 'who is'],
      response: "Faine Labs works **exclusively with roofing companies**—including residential roof replacement contractors, commercial roofers, repair specialists, and storm restoration teams. Everything we build is tailored to roofing lead capture, follow-up, and inspection scheduling."
    },
    {
      keywords: ['setup', 'fast', 'how long', 'timeline', 'onboarding', 'start'],
      response: "Our onboarding is quick and turnkey (typically 3 to 5 business days): 1) We audit your lead flow and calendar setup, 2) We custom-train your AI on your services and territory, and 3) We deploy the automations so you can start capturing leads immediately."
    },
    {
      keywords: ['inspection', 'calendar', 'google calendar', 'outlook', 'estimator'],
      response: "When a qualified homeowner wants an estimate, the AI presents available inspection windows synced with your Google Calendar or Outlook in real time. Once booked, it sends automated reminder texts to the homeowner so estimators arrive with zero no-shows."
    }
  ];

  function appendMessage(sender, text, isHtml = false) {
    const msgWrapper = document.createElement('div');
    msgWrapper.className = `flex items-start gap-3 ${sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`;

    if (sender === 'ai') {
      msgWrapper.innerHTML = `
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-500/30">
          <i data-lucide="bot" class="w-4 h-4 text-white"></i>
        </div>
        <div class="chat-bubble-ai p-3.5 max-w-[82%] text-sm shadow-md">
          ${isHtml ? text : formatMarkdown(text)}
          <span class="block text-[10px] text-zinc-400 mt-1 text-right">Just now • AI Assistant</span>
        </div>
      `;
    } else {
      msgWrapper.innerHTML = `
        <div class="chat-bubble-user p-3.5 max-w-[82%] text-sm shadow-md">
          <p>${escapeHtml(text)}</p>
          <span class="block text-[10px] text-red-200 mt-1 text-right">Just now</span>
        </div>
        <div class="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-zinc-200">
          You
        </div>
      `;
    }

    chatMessages.appendChild(msgWrapper);
    lucide.createIcons();
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function showTypingIndicator() {
    const typingId = 'typing-' + Date.now();
    const typingElem = document.createElement('div');
    typingElem.id = typingId;
    typingElem.className = 'flex items-start gap-3 justify-start';
    typingElem.innerHTML = `
      <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center flex-shrink-0">
        <i data-lucide="bot" class="w-4 h-4 text-white"></i>
      </div>
      <div class="chat-bubble-ai py-3 px-4 flex items-center gap-1.5 shadow-sm">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;
    chatMessages.appendChild(typingElem);
    lucide.createIcons();
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingId;
  }

  function removeTypingIndicator(id) {
    const elem = document.getElementById(id);
    if (elem) elem.remove();
  }

  function handleUserQuery(query) {
    if (!query.trim()) return;
    appendMessage('user', query);

    const typingId = showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator(typingId);
      const lower = query.toLowerCase();
      let matched = cannedKnowledge.find(item => 
        item.keywords.some(k => lower.includes(k))
      );

      let reply = matched 
        ? matched.response 
        : `Thanks for testing! Our AI system engages homeowners, qualifies repair or replacement needs, and books inspections directly into your team calendar. Would you like to schedule a 15-minute demo to see how it works for your company?`;

      appendMessage('ai', reply);
    }, 800);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => {
      const val = chatInput.value;
      if (val) {
        handleUserQuery(val);
        chatInput.value = '';
      }
    });

    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = chatInput.value;
        if (val) {
          handleUserQuery(val);
          chatInput.value = '';
        }
      }
    });
  }

  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const promptText = chip.getAttribute('data-prompt') || chip.textContent.trim();
      handleUserQuery(promptText);
    });
  });

  if (resetChatBtn) {
    resetChatBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-rose-700 flex items-center justify-center flex-shrink-0 shadow-sm shadow-red-500/30">
            <i data-lucide="bot" class="w-4 h-4 text-white"></i>
          </div>
          <div class="chat-bubble-ai p-3.5 max-w-[82%] text-sm shadow-md">
            <p class="font-medium text-white mb-1">Hello! I'm the Faine Labs AI Assistant 👋</p>
            <p class="text-zinc-300">I handle incoming homeowner inquiries, qualify repair and replacement projects, and schedule on-site inspections. Try asking a question or click a prompt below!</p>
            <span class="block text-[10px] text-zinc-400 mt-2 text-right">Online • Instant Response Demo</span>
          </div>
        </div>
      `;
      lucide.createIcons();
      showToast('Demo chat reset');
    });
  }
}

/* ==========================================================================
   3. Missed Call & Automated SMS Workflow Simulator
   ========================================================================== */
function initSMSWorkflowDemo() {
  const triggerBtn = document.getElementById('triggerSmsDemoBtn');
  const stepNodes = document.querySelectorAll('.sms-step-node');
  const smsScreen = document.getElementById('smsScreenFeed');
  let currentStep = 0;
  let isSimulating = false;

  const stepsData = [
    {
      type: 'missed-call',
      title: 'Incoming Homeowner Call Missed',
      badge: 'Step 1: Missed Call',
      html: `
        <div class="p-3 bg-red-950/30 border border-red-500/40 rounded-lg flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center flex-shrink-0">
            <i data-lucide="phone-missed" class="w-4 h-4"></i>
          </div>
          <div>
            <div class="text-xs font-semibold text-red-300">Missed Call from Homeowner</div>
            <div class="text-[11px] text-zinc-400">+1 (512) •••-4921 • Inbound Caller</div>
          </div>
        </div>
      `
    },
    {
      type: 'auto-sms',
      title: 'Instant SMS Text-Back (< 3s)',
      badge: 'Step 2: Instant Response',
      html: `
        <div class="flex justify-end">
          <div class="sms-bubble-outgoing p-3 max-w-[85%] text-xs shadow-md">
            <p>Hi! This is Apex Roofing. Sorry we missed your call—we're currently on a job. Are you looking for a roof repair, full replacement, or storm inspection?</p>
            <span class="block text-[10px] text-red-200 mt-1 text-right">Auto-Sent in 2.1s</span>
          </div>
        </div>
      `
    },
    {
      type: 'lead-reply',
      title: 'Homeowner Replies with Damage Details',
      badge: 'Step 3: Homeowner Reply',
      html: `
        <div class="flex justify-start">
          <div class="sms-bubble-incoming p-3 max-w-[85%] text-xs shadow-md">
            <p>Hi, we had hail yesterday and have a leak in our ceiling. We need someone to inspect the roof ASAP for our insurance claim.</p>
            <span class="block text-[10px] text-zinc-400 mt-1">Just now</span>
          </div>
        </div>
      `
    },
    {
      type: 'ai-booking',
      title: 'AI Qualifies Urgency & Offers Inspection',
      badge: 'Step 4: AI Qualification',
      html: `
        <div class="flex justify-end">
          <div class="sms-bubble-outgoing p-3 max-w-[85%] text-xs shadow-md">
            <p>We can definitely get an inspector out to document the hail damage and help with your claim. Pick a convenient time for your Free Roof Inspection here: <strong class="underline">fainelabs.com/book-inspection</strong></p>
            <span class="block text-[10px] text-red-200 mt-1 text-right">AI Assistant</span>
          </div>
        </div>
      `
    },
    {
      type: 'crm-update',
      title: 'Roof Inspection Booked & Estimator Dispatched',
      badge: 'Step 5: Inspection Booked',
      html: `
        <div class="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <i data-lucide="calendar-check" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-xs font-semibold text-emerald-300">Free Roof Inspection Booked!</div>
              <div class="text-[10px] text-zinc-400">Tomorrow at 10:00 AM • Synced to Estimator Route</div>
            </div>
          </div>
          <span class="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-medium">Confirmed</span>
        </div>
      `
    }
  ];

  function runSimulation() {
    if (isSimulating) return;
    isSimulating = true;
    currentStep = 0;
    smsScreen.innerHTML = '';
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Running Flow...`;
    lucide.createIcons();

    function nextStep() {
      if (currentStep < stepsData.length) {
        const item = stepsData[currentStep];

        // Update step nodes
        stepNodes.forEach((node, idx) => {
          if (idx === currentStep) {
            node.classList.add('border-red-500', 'bg-red-950/40', 'text-red-300');
            node.classList.remove('border-zinc-800', 'opacity-50', 'text-zinc-400');
          } else if (idx < currentStep) {
            node.classList.add('border-emerald-500/40', 'opacity-80', 'text-emerald-400');
            node.classList.remove('border-red-500', 'bg-red-950/40', 'text-red-300');
          } else {
            node.classList.add('opacity-50', 'border-zinc-800', 'text-zinc-400');
            node.classList.remove('border-red-500', 'bg-red-950/40', 'text-red-300', 'border-emerald-500/40');
          }
        });

        const wrapper = document.createElement('div');
        wrapper.className = 'space-y-2 animate-fadeIn';
        wrapper.innerHTML = item.html;
        smsScreen.appendChild(wrapper);
        lucide.createIcons();
        smsScreen.scrollTop = smsScreen.scrollHeight;

        currentStep++;
        setTimeout(nextStep, 1300);
      } else {
        isSimulating = false;
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Replay Flow Simulation`;
        lucide.createIcons();
        showToast('Simulation complete: Missed call converted into a booked inspection!');
      }
    }

    nextStep();
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', runSimulation);
  }
}

/* ==========================================================================
   4. Live Workflow Activity Stream
   ========================================================================== */
function initDashboardTicker() {
  const tickerContainer = document.getElementById('heroLiveFeed');
  if (!tickerContainer) return;

  const mockEvents = [
    {
      icon: 'phone-incoming',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      title: 'Missed Call Recovered',
      desc: 'Sub-3s SMS text sent to homeowner inquiring about roof leak'
    },
    {
      icon: 'bot',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      title: 'Storm Damage Lead Qualified',
      desc: 'Hail damage criteria & insurance provider details gathered'
    },
    {
      icon: 'calendar-check',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/20',
      title: 'Inspection Booked',
      desc: 'Full replacement estimate confirmed on estimator calendar'
    },
    {
      icon: 'repeat',
      color: 'text-rose-400',
      bg: 'bg-rose-500/20',
      title: 'Estimate Follow-Up Sent',
      desc: 'Automated quote follow-up SMS re-engaged homeowner'
    },
    {
      icon: 'star',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      title: '5-Star Review Dispatched',
      desc: 'Post-job Google review request triggered automatically'
    },
    {
      icon: 'refresh-cw',
      color: 'text-teal-400',
      bg: 'bg-teal-500/20',
      title: 'Cold Lead Reactivated',
      desc: 'Spring storm inspection reminder converted to booking'
    }
  ];

  let eventIdx = 0;

  function pushEvent() {
    const ev = mockEvents[eventIdx % mockEvents.length];
    eventIdx++;

    const item = document.createElement('div');
    item.className = 'p-2.5 bg-zinc-950/80 border border-zinc-800/80 rounded-lg flex items-center justify-between text-xs transition-all duration-300 animate-fadeIn';
    item.innerHTML = `
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 rounded-full ${ev.bg} ${ev.color} flex items-center justify-center flex-shrink-0">
          <i data-lucide="${ev.icon}" class="w-3.5 h-3.5"></i>
        </div>
        <div>
          <div class="font-medium text-zinc-200">${ev.title}</div>
          <div class="text-[11px] text-zinc-400">${ev.desc}</div>
        </div>
      </div>
      <span class="text-[10px] text-red-400 font-mono">Active</span>
    `;

    tickerContainer.prepend(item);
    lucide.createIcons();

    if (tickerContainer.children.length > 4) {
      tickerContainer.removeChild(tickerContainer.lastChild);
    }
  }

  // Initial populate
  pushEvent();
  pushEvent();
  pushEvent();

  // Pulse new stream event periodically
  setInterval(pushEvent, 4500);
}

/* ==========================================================================
   5. Modals & Dialog Handling
   ========================================================================== */
function initModals() {
  const bookDemoBtns = document.querySelectorAll('.open-booking-modal');
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  bookDemoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(bookingModal);
    });
  });

  if (closeBookingModal) {
    closeBookingModal.addEventListener('click', () => closeModal(bookingModal));
  }

  // Backdrop clicks
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) {
        closeModal(bookingModal);
      }
    });
  }

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(bookingModal);
    }
  });
}

/* ==========================================================================
   6. Form Submissions & Toast Feedback
   ========================================================================== */
function initForms() {
  const bookingForm = document.getElementById('bookingForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Scheduling Your Demo...`;
      lucide.createIcons();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        bookingForm.reset();
        const bookingModal = document.getElementById('bookingModal');
        if (bookingModal) {
          bookingModal.classList.add('hidden');
          bookingModal.classList.remove('flex');
        }
        document.body.style.overflow = 'auto';
        showToast('Demo request received! We will contact you shortly to confirm your time.');
      }, 1000);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Subscribed to Faine Labs revenue automation updates!');
    });
  }
}

/* ==========================================================================
   7. Floating Quick Widget
   ========================================================================== */
function initFloatingWidget() {
  const toggleBtn = document.getElementById('floatingWidgetToggle');
  const widgetBox = document.getElementById('floatingWidgetBox');
  const closeBtn = document.getElementById('closeFloatingWidget');

  if (toggleBtn && widgetBox) {
    toggleBtn.addEventListener('click', () => {
      widgetBox.classList.toggle('hidden');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        widgetBox.classList.add('hidden');
      });
    }
  }
}

/* ==========================================================================
   8. Utility Helpers
   ========================================================================== */
function initCurrentYear() {
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
}

function showToast(message) {
  const container = document.getElementById('toastContainer') || createToastContainer();
  const toast = document.createElement('div');
  toast.className = 'toast-item';
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
      <i data-lucide="check" class="w-3.5 h-3.5"></i>
    </div>
    <div class="text-sm font-medium text-zinc-100">${escapeHtml(message)}</div>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function createToastContainer() {
  const cont = document.createElement('div');
  cont.id = 'toastContainer';
  cont.className = 'toast-container';
  document.body.appendChild(cont);
  return cont;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatMarkdown(text) {
  let formatted = escapeHtml(text);
  // Bold **text**
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
  // Italic *text*
  formatted = formatted.replace(/\*(.*?)\*/g, '<em class="text-zinc-300">$1</em>');
  return formatted;
}
