/**
 * Faine Labs - Interactive UI & Automation Sandbox Engine
 * Crimson Red & Deep Black Edition
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initAIChatDemo();
  initSMSWorkflowDemo();
  initROICalculator();
  initDashboardTicker();
  initModals();
  initForms();
  initFloatingWidget();
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

  // Scrollspy & Glass navbar effect
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
      keywords: ['quote', 'price', 'pricing', 'cost', '299', 'package', 'all-in-one', 'plan'],
      response: "Our complete All-in-One Growth Suite includes our full CRM, 24/7 AI Chatbot, automated SMS/Email pipelines, Missed Call Text-Back, and website hosting for **$299/month flat** with zero long-term contracts. Would you like to see how much you'd save?"
    },
    {
      keywords: ['missed call', 'text-back', 'missed', 'call', 'phone'],
      response: "Whenever you miss a customer call, Faine Labs triggers an instant personalized SMS within **3 seconds** (e.g. *'Hi! Sorry I missed your call, how can I help you?'*). It captures 60%+ of leads before they call your competitors!"
    },
    {
      keywords: ['book', 'schedule', 'demo', 'consult', 'appointment', 'time', 'tomorrow'],
      response: "I'd be happy to get you scheduled! You can pick any available 15-minute slot with our team right here. 📅 Click 'Book Demo' or tap below to lock in a time."
    },
    {
      keywords: ['services', 'crm', 'pipeline', 'features', 'offer', 'gohighlevel'],
      response: "Faine Labs builds and manages 7 core automated systems: 1) CRM & Pipeline Automation, 2) Lead Nurturing, 3) 24/7 AI Chatbots, 4) Missed Call Text-Back, 5) Automated Google Reviews, 6) Smart Booking, and 7) Conversion Funnels."
    },
    {
      keywords: ['dental', 'clinic', 'real estate', 'plumbing', 'agency', 'contractor', 'home services'],
      response: "We have pre-built, niche-specific automation playbooks designed specifically for high-conversion lead capture, instant review boosts, and automated reminders that eliminate no-shows!"
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
          <span class="block text-[10px] text-zinc-400 mt-1 text-right">Just now • AI Agent</span>
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
        : `Thanks for reaching out! Our AI agent qualifies leads 24/7, routes hot opportunities to your team, and books appointments straight into your calendar. Would you like to test drive the setup for your business?`;

      appendMessage('ai', reply);
    }, 900);
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
            <p class="text-zinc-300">I can qualify leads, explain our automated systems, or book appointments 24/7. Ask me anything or click a sample prompt below!</p>
            <span class="block text-[10px] text-zinc-400 mt-2 text-right">Online • Instant Response</span>
          </div>
        </div>
      `;
      lucide.createIcons();
      showToast('Chat conversation reset');
    });
  }
}

/* ==========================================================================
   3. Missed Call & SMS Nurture Workflow Simulator
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
      title: 'Incoming Call Missed',
      badge: '00:00 - Trigger',
      html: `
        <div class="p-3 bg-red-950/30 border border-red-500/40 rounded-lg flex items-center gap-3">
          <div class="w-9 h-9 rounded-full bg-red-600/20 text-red-400 flex items-center justify-center">
            <i data-lucide="phone-missed" class="w-5 h-5"></i>
          </div>
          <div>
            <div class="text-xs font-semibold text-red-300">Missed Call Detected</div>
            <div class="text-[11px] text-zinc-400">+1 (512) 839-4921 • 10:14 AM</div>
          </div>
        </div>
      `
    },
    {
      type: 'auto-sms',
      title: 'Instant SMS Auto-Sent (< 3s)',
      badge: '00:02 - Automated Outreach',
      html: `
        <div class="flex justify-end">
          <div class="sms-bubble-outgoing p-3 max-w-[85%] text-xs shadow-md">
            <p>Hi there! This is Sarah from Faine Labs. Sorry I missed your call! How can I help you today?</p>
            <span class="block text-[10px] text-red-200 mt-1 text-right">10:14 AM • Auto-Sent in 2.1s</span>
          </div>
        </div>
      `
    },
    {
      type: 'lead-reply',
      title: 'Lead Responded via SMS',
      badge: '00:45 - Customer Response',
      html: `
        <div class="flex justify-start">
          <div class="sms-bubble-incoming p-3 max-w-[85%] text-xs shadow-md">
            <p>Hey Sarah! I saw your post. We need automated CRM lead follow-up and review requests for our clinic.</p>
            <span class="block text-[10px] text-zinc-400 mt-1">10:15 AM</span>
          </div>
        </div>
      `
    },
    {
      type: 'ai-booking',
      title: 'AI Sent Smart Booking Link',
      badge: '00:48 - AI Qualification',
      html: `
        <div class="flex justify-end">
          <div class="sms-bubble-outgoing p-3 max-w-[85%] text-xs shadow-md">
            <p>Awesome! Our system automates both seamlessly. Here's a link to pick a quick 15-min demo: <strong class="underline">fainelabs.com/book</strong></p>
            <span class="block text-[10px] text-red-200 mt-1 text-right">10:15 AM • AI Automation</span>
          </div>
        </div>
      `
    },
    {
      type: 'crm-update',
      title: 'CRM Pipeline Stage Updated',
      badge: '01:10 - Opportunity Logged',
      html: `
        <div class="p-3 bg-emerald-950/30 border border-emerald-500/40 rounded-lg flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <i data-lucide="check-circle-2" class="w-4 h-4"></i>
            </div>
            <div>
              <div class="text-xs font-semibold text-emerald-300">Appointment Booked & Deal Created</div>
              <div class="text-[10px] text-zinc-400">All-in-One Engine • Assigned to Team</div>
            </div>
          </div>
          <span class="px-2 py-0.5 text-[10px] bg-emerald-500/20 text-emerald-300 rounded font-medium">Won</span>
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
    triggerBtn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Simulating Automation...`;
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
        setTimeout(nextStep, 1400);
      } else {
        isSimulating = false;
        triggerBtn.disabled = false;
        triggerBtn.innerHTML = `<i data-lucide="play" class="w-4 h-4"></i> Replay Full Automation Flow`;
        lucide.createIcons();
        showToast('Workflow completed: 1 lead saved from missed call!');
      }
    }

    nextStep();
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', runSimulation);
  }
}

/* ==========================================================================
   4. Interactive ROI & Software Replacement Calculator
   ========================================================================== */
function initROICalculator() {
  const leadSlider = document.getElementById('leadVolumeSlider');
  const leadValueDisplay = document.getElementById('leadVolumeValue');
  const toolCheckboxes = document.querySelectorAll('.tool-checkbox');
  
  const oldCostDisplay = document.getElementById('calcOldCost');
  const newCostDisplay = document.getElementById('calcNewCost');
  const monthlySavingsDisplay = document.getElementById('calcMonthlySavings');
  const annualSavingsDisplay = document.getElementById('calcAnnualSavings');
  const revenueBoostDisplay = document.getElementById('calcRevenueBoost');

  function calculate() {
    const leads = parseInt(leadSlider.value, 10);
    leadValueDisplay.textContent = `${leads} leads / mo`;

    let totalToolCost = 0;
    toolCheckboxes.forEach(cb => {
      if (cb.checked) {
        totalToolCost += parseFloat(cb.getAttribute('data-cost') || 0);
      }
    });

    const faineLabsCost = 299;
    const monthlySavings = Math.max(0, totalToolCost - faineLabsCost);
    const annualSavings = monthlySavings * 12;

    // Estimate recovered revenue from missed calls & 24/7 AI qualification
    const recoveredDeals = Math.round(leads * 0.12);
    const estimatedRecoveredRev = recoveredDeals * 350;

    oldCostDisplay.textContent = `$${totalToolCost.toLocaleString()}/mo`;
    newCostDisplay.textContent = `$${faineLabsCost}/mo`;
    monthlySavingsDisplay.textContent = `$${monthlySavings.toLocaleString()}/mo`;
    annualSavingsDisplay.textContent = `$${annualSavings.toLocaleString()}/yr`;
    revenueBoostDisplay.textContent = `+$${estimatedRecoveredRev.toLocaleString()}/mo`;
  }

  if (leadSlider) {
    leadSlider.addEventListener('input', calculate);
    toolCheckboxes.forEach(cb => cb.addEventListener('change', calculate));
    calculate();
  }
}

/* ==========================================================================
   5. Dashboard Real-Time Live Activity Ticker
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
      desc: 'Auto SMS sent to +1 (702) •••-9182 in 1.9s'
    },
    {
      icon: 'bot',
      color: 'text-red-400',
      bg: 'bg-red-500/20',
      title: 'AI Chatbot Converted Lead',
      desc: 'Discovery call booked with Dental Care Pro'
    },
    {
      icon: 'star',
      color: 'text-amber-400',
      bg: 'bg-amber-500/20',
      title: '5★ Review Received',
      desc: 'Automated SMS review campaign generated Google review'
    },
    {
      icon: 'dollar-sign',
      color: 'text-rose-400',
      bg: 'bg-rose-500/20',
      title: 'Pipeline Deal Won',
      desc: 'All-In-One setup completed ($2,400 deal value)'
    },
    {
      icon: 'mail',
      color: 'text-red-300',
      bg: 'bg-red-500/20',
      title: 'Nurture Drip Triggered',
      desc: 'Multi-channel sequence Day 3 email & SMS dispatched'
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
      <span class="text-[10px] text-red-400 font-mono">Just now</span>
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

  // Periodically insert live simulated pulses
  setInterval(pushEvent, 4500);
}

/* ==========================================================================
   6. Modals & Dialog Handling
   ========================================================================== */
function initModals() {
  // Booking Modal
  const bookDemoBtns = document.querySelectorAll('.open-booking-modal');
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');

  // Checkout / Get Started Modal
  const getStartedBtns = document.querySelectorAll('.open-get-started-modal');
  const checkoutModal = document.getElementById('checkoutModal');
  const closeCheckoutModal = document.getElementById('closeCheckoutModal');

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

  getStartedBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(checkoutModal);
    });
  });

  if (closeCheckoutModal) {
    closeCheckoutModal.addEventListener('click', () => closeModal(checkoutModal));
  }

  // Backdrop clicks
  [bookingModal, checkoutModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal(bookingModal);
      closeModal(checkoutModal);
    }
  });
}

/* ==========================================================================
   7. Form Submissions & Toast Feedback
   ========================================================================== */
function initForms() {
  const bookingForm = document.getElementById('bookingForm');
  const checkoutForm = document.getElementById('checkoutForm');
  const newsletterForm = document.getElementById('newsletterForm');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = bookingForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Confirming Strategy Session...`;
      lucide.createIcons();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        bookingForm.reset();
        document.getElementById('bookingModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        showToast('🎉 Strategy Call Confirmed! Check your email for calendar invite.');
      }, 1200);
    });
  }

  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = checkoutForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-4 h-4 animate-spin"></i> Initializing Onboarding...`;
      lucide.createIcons();

      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        checkoutForm.reset();
        document.getElementById('checkoutModal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        showToast('🚀 Welcome to Faine Labs! Our team will contact you within 2 business hours.');
      }, 1400);
    });
  }

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterForm.reset();
      showToast('Subscribed to Faine Labs Automation Insights!');
    });
  }
}

/* ==========================================================================
   8. Floating Quick Widget
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
   Utility Helpers
   ========================================================================== */
function showToast(message, type = 'success') {
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
