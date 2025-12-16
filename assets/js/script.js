    const techCategories = document.querySelectorAll('.tech-category');
    const techItems = document.querySelectorAll('.tech-items');

    techCategories.forEach(category => {
        category.addEventListener('click', () => {
            techCategories.forEach(cat => cat.classList.remove('active'));
            category.classList.add('active');


            techItems.forEach(item => item.classList.remove('active'));
            const targetId = category.getAttribute('data-category');
            document.getElementById(targetId).classList.add('active');
        });
    });