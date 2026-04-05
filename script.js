





$(document).ready(function() {
  // 1. Theme toogle
  const themeToggle = $('#theme-toggle');
  const storedTheme = localStorage.getItem('theme');
  let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
  
  if (storedTheme) {
      currentTheme = storedTheme;
      document.documentElement.setAttribute('data-theme', storedTheme);
  }
  updateToggleIcon(currentTheme);

  themeToggle.on('click', function() {
      let currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      let targetTheme = currentTheme === 'dark' ? 'light' : 'dark';

      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
      updateToggleIcon(targetTheme);
  });

  function updateToggleIcon(theme) {
      if (theme === 'dark') {
          $('#theme-toggle-icon').removeClass('fa-moon').addClass('fa-sun');
      } else {
          $('#theme-toggle-icon').removeClass('fa-sun').addClass('fa-moon');
      }
  }

  // 2. Initialize Bootstrap Tooltips and Popovers
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

  // 3. Dynamic Modal Content (jQuery Integration)
  $('.view-project-btn').on('click', function() {
      // Extract data from button attributes
      const title = $(this).data('title');
      const desc = $(this).data('desc');
      const tags = $(this).data('tags').split(',');
      const img = $(this).data('img');
      
      // Populate Modal
      $('#projectModalLabel').text(title);
      $('#projectModalDesc').text(desc);
      $('#projectModalImg').attr('src', img);
      
      let badgesHtml = '';
      tags.forEach(tag => {
          badgesHtml += `<span class="badge bg-primary me-1">${tag.trim()}</span>`;
      });
      $('#projectModalTags').html(badgesHtml);
      
      // Trigger modal dynamically
      const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
      projectModal.show();
  });

  // 4. Form Validation Logic
  $('#contactForm').on('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      $(this).find('.form-control, .form-select').each(function() {
          if (!this.checkValidity()) {
              $(this).addClass('is-invalid').removeClass('is-valid');
              isValid = false;
          } else {
              $(this).addClass('is-valid').removeClass('is-invalid');
          }
      });

      if (isValid) {
          // Show alert and reset form
          $('#formSuccessAlert').slideDown().delay(3000).slideUp();
          $(this)[0].reset();
          $(this).find('.form-control, .form-select').removeClass('is-valid');
      }
  });

  // 5. Smooth scroll for anchor links
  $('a[href^="#"]').on('click', function(e) {
      e.preventDefault();
      var target = this.hash;
      if (target) {
          $('html, body').animate({
              scrollTop: $(target).offset().top - 70
          }, 800);
      }
  });

  // 6. Show/Hide Element Interaction
  $('#toggleExtraInfo').on('click', function() {
      $('#extraInfoBlock').slideToggle(300);
      let btnText = $(this).text().includes('Show') ? 'Hide Details' : 'Show Details';
      $(this).text(btnText);
  });
  
  // Animation on scroll trigger
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.animate-on-scroll').forEach((el) => {
    observer.observe(el);
  });
});
