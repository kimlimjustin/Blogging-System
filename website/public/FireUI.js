// Wait the DOM to be loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set the website theme color according to the latest user preference saved in localStorage
    if(localStorage.getItem('theme-color')){
        document.body.setAttribute('theme', localStorage.getItem('theme-color'))
    }
    // Searching all attributes with switch-theme attribute
    document.querySelectorAll("[switch-theme]").forEach(btn => {
        btn.addEventListener("click", () => {
            if(document.body.getAttribute('theme') === "dark"){
                localStorage.setItem('theme-color', "light")
            }else{
                localStorage.setItem('theme-color', "dark")
            }document.body.setAttribute('theme', localStorage.getItem('theme-color'))
        })
    })
    document.querySelectorAll(".topnav-hamburger-menu").forEach(menu => {
        document.getElementById(menu.dataset.target).classList.add('topnav-list')
        menu.addEventListener("click", () => {
            if(window.getComputedStyle(document.getElementById(menu.dataset.target)).getPropertyValue('display') === "block"){
                menu.innerHTML = "&#x2630;";
                document.getElementById(menu.dataset.target).style.display = "none";
            }else{
                menu.innerHTML = "&times;";
                document.getElementById(menu.dataset.target).style.display = "block";
            }
        })
    })
    document.querySelectorAll(".sidenav-menu-btn").forEach(menu => {
        menu.addEventListener("click", () => {
            document.querySelectorAll(".sidenav-close-btn").forEach(btn => {
                btn.addEventListener("click", () => {
                    document.getElementById(btn.dataset.target).style.width = "0%";
                })
            })
            if(window.innerWidth <= 768) document.getElementById(menu.dataset.target).style.width = "100%"
            else document.getElementById(menu.dataset.target).style.width = "250px"
        })
    })
    document.querySelectorAll("[open-modal]").forEach(btn => {
        btn.addEventListener("click", () => {
            let modal = document.getElementById(btn.dataset.modal);
            window.onclick = e =>  {if(e.target == modal) modal.style.display = "none"}
            if(window.getComputedStyle(modal).getPropertyValue('display') === "block"){
                modal.style.display = "none";
            }else modal.style.display = "block";
        })
    })
    document.querySelectorAll(".modal-close-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.getElementById(btn.dataset.modal).style.display = "none";
        })
    })
    document.querySelectorAll(".fixed-sidenav-dropdown-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if(window.getComputedStyle(document.getElementById(btn.dataset.dropdown)).getPropertyValue('display') === "block"){
                document.getElementById(btn.dataset.dropdown).style.display = "none"
            }else{
                document.getElementById(btn.dataset.dropdown).style.display = "block";
            }
        })
    })
    document.querySelectorAll(".tab").forEach(tab => {
        tab.childNodes.forEach(btn => {
            //Checking if btn is a valid element containing tab-btn class
            if(btn.classList && btn.classList.contains("tab-btn")){
                btn.addEventListener("click", () => {
                    document.querySelectorAll(".tab-content").forEach(content => {
                        if(content.parentElement.id === tab.dataset.tab){
                            content.style.display = "none";
                        }
                    })
                    document.getElementById(btn.dataset.content).style.display = "block"
                })
            }
        })
    })
    document.querySelectorAll(".accordion").forEach(accordion => {
        accordion.addEventListener("click", () => {
            accordion.classList.toggle("accordion-active");
            var panel = document.getElementById(accordion.dataset.panel);
            if(panel.style.maxHeight) panel.style.maxHeight = null;
            else panel.style.maxHeight = panel.scrollHeight + 'px';
        })
    })
})