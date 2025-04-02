// Sidebar functionality 
function initSidebar() { 
    // Toggle Sidebar on mobile 
    const toggleBtn = document.getElementById('toggleSidebar'); 
    const sidebar = document.getElementById('sidebar'); 
    if (toggleBtn && sidebar) 
        { toggleBtn.addEventListener('click', function() 
            { sidebar.classList.toggle('show'); }); 
        } // Set active menu item based on current page 
        const currentPage = window.location.pathname.split('/').pop() || 'index.html'; 
        const menuLinks = document.querySelectorAll('.sidebar .nav-link'); 
        menuLinks.forEach(link => { 
            const href = link.getAttribute('href'); 
            if (href === currentPage) 
                { 
                    link.classList.add('active'); 
                } 
                else if (currentPage === 'index.html' && href === '#') 
                { link.classLi// Sidebar functionality function initSidebar() { // Toggle Sidebar on mobile const toggleBtn = document.getElementById('toggleSidebar'); const sidebar = document.getElementById('sidebar'); if (toggleBtn && sidebar) { toggleBtn.addEventListener('click', function() { sidebar.classList.toggle('show'); }); } // Set active menu item based on current page const currentPage = window.location.pathname.split('/').pop() || 'index.html'; const menuLinks = document.querySelectorAll('.sidebar .nav-link'); menuLinks.forEach(link => { const href = link.getAttribute('href'); if (href === currentPage) { link.classList.add('active'); } else if (currentPage === 'index.html' && href === '#') { link.classList.add('active'); } }); } // Initialize sidebar when DOM is loaded document.addEventListener('DOMContentLoaded', initSidebar);st.add('active'); } }); } // Initialize sidebar when DOM is loaded document.addEventListener('DOMContentLoaded', initSidebar);