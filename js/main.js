/* ==========================================================================
   CEA KÁTYLA ANDRADE - CENTRO DE ESTÉTICA ANIMAL
   Scripts Principais & Interatividade (Vanilla JavaScript Leve e Otimizado)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Cabeçalho Fixo ao Rolar a Página
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Menu Mobile Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
        document.body.classList.add('menu-open');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
        document.body.classList.remove('menu-open');
      }
    });

    // Fechar menu mobile ao clicar em qualquer link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }

  // 3. Botões "Selecionar no Agendamento" nos Cards de Serviços
  const selectServiceBtns = document.querySelectorAll('.btn-select-service');
  selectServiceBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceValue = btn.getAttribute('data-service');
      if (serviceValue) {
        const checkbox = document.querySelector(`input[name="services"][value="${serviceValue}"]`);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.parentElement.classList.add('highlight-pulse');
          setTimeout(() => {
            checkbox.parentElement.classList.remove('highlight-pulse');
          }, 1500);
        }
      }

      const bookingSection = document.getElementById('agendamento');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 4. Botões "Consultar Pacote" nos Cards de Pacotes
  const selectPackageBtns = document.querySelectorAll('.btn-select-package');
  selectPackageBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const packageValue = btn.getAttribute('data-package');
      if (packageValue) {
        const checkbox = document.querySelector(`input[name="services"][value="${packageValue}"]`);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.parentElement.classList.add('highlight-pulse');
          setTimeout(() => {
            checkbox.parentElement.classList.remove('highlight-pulse');
          }, 1500);
        }
      }
      const bookingSection = document.getElementById('agendamento');
      if (bookingSection) {
        bookingSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // 5. Formulário de Agendamento Interativo Integrado ao WhatsApp Oficial
  const bookingForm = document.getElementById('petBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const tutorName = document.getElementById('tutorName').value.trim();
      const tutorPhone = document.getElementById('tutorPhone').value.trim();
      const petName = document.getElementById('petName').value.trim();
      const petTypeInput = document.querySelector('input[name="petType"]:checked');
      const petType = petTypeInput ? petTypeInput.value : 'Pet';
      const petBreed = document.getElementById('petBreed').value.trim() || 'Não informada';
      const petSize = document.getElementById('petSize').value;
      const preferredDate = document.getElementById('preferredDate').value;
      const preferredPeriod = document.getElementById('preferredPeriod').value;
      const petNotes = document.getElementById('petNotes').value.trim();

      // Coletar serviços selecionados
      const checkedServices = [];
      document.querySelectorAll('input[name="services"]:checked').forEach(cb => {
        checkedServices.push(cb.value);
      });

      if (!tutorName || !petName) {
        alert('Por favor, informe seu nome e o nome do seu pet para prosseguir!');
        return;
      }

      // Formatação da data (se preenchida)
      let formattedDate = 'A combinar';
      if (preferredDate) {
        const parts = preferredDate.split('-');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      }

      const servicesText = checkedServices.length > 0
        ? checkedServices.map(s => `  • ${s}`).join('\n')
        : '  • Avaliação dos serviços no momento do atendimento';

      // Montagem da Mensagem Personalizada
      let message = `Olá Kátyla! Gostaria de agendar um horário no *Centro de Estética Animal* ❤️\n\n`;
      message += `🐾 *DADOS DO PET:*\n`;
      message += `• *Nome:* ${petName}\n`;
      message += `• *Espécie:* ${petType}\n`;
      message += `• *Porte:* ${petSize}\n`;
      message += `• *Raça:* ${petBreed}\n\n`;

      message += `👤 *DADOS DO TUTOR:*\n`;
      message += `• *Nome:* ${tutorName}\n`;
      if (tutorPhone) {
        message += `• *WhatsApp/Tel:* ${tutorPhone}\n`;
      }
      message += `\n`;

      message += `✨ *SERVIÇOS DE INTERESSE:*\n${servicesText}\n\n`;

      message += `🗓️ *PREFERÊNCIA DE HORÁRIO:*\n`;
      message += `• *Data Desejada:* ${formattedDate}\n`;
      message += `• *Período:* ${preferredPeriod}\n\n`;

      if (petNotes) {
        message += `📝 *OBSERVAÇÕES DO PET:*\n"${petNotes}"\n\n`;
      }

      message += `Sei que o atendimento é exclusivamente com horário marcado (Terça a Sábado das 08h às 17h) para manter o ambiente sem estresse. Aguardo a confirmação da agenda! Obrigado(a)! 🐾✨`;

      // Número oficial ajustado: 5514997068468 (com o 9)
      const whatsappNumber = '5514997068468';
      const encodedUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

      window.open(encodedUrl, '_blank');
    });
  }

  // 6. Galeria VIP & Lightbox Modal
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  if (lightboxModal && galleryItems.length > 0) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title') || 'Cliente Especial CEA';
        const desc = item.getAttribute('data-desc') || 'Atendimento com amor e cuidado individualizado.';

        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt || title;
        }
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;

        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }

  // 7. FAQ Accordion Interativo
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
          }
        });

        if (!isActive) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }
  });

  // 8. Máscara para Telefone (WhatsApp)
  const tutorPhoneInput = document.getElementById('tutorPhone');
  if (tutorPhoneInput) {
    tutorPhoneInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length > 11) value = value.slice(0, 11);

      if (value.length > 10) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
      } else if (value.length > 6) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
      } else if (value.length > 2) {
        e.target.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        e.target.value = value;
      }
    });
  }

  // 9. Animações Leves de Scroll (IntersectionObserver nativo sem peso)
  const animateElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && animateElements.length > 0) {
    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(el => scrollObserver.observe(el));
  } else {
    // Fallback se não suportar observer
    animateElements.forEach(el => el.classList.add('is-revealed'));
  }
});
