const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('showElem');
        }
        else {
            entry.target.classList.remove('showElem');
        }
    });
})

const itemsNav = document.querySelectorAll(".nav-link");

const btnClose = document.querySelector(".navbar-toggler")

itemsNav.forEach(item => {
    item.addEventListener("click", () => {
        btnClose.click();
    });
});


const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

let charts = {};


function createGraphic(canvas, data, title, type = "radar", height = "300px", width = ["300px", window.innerWidth.toString() + "px"], scale = false) {

    var config = {
        type: type,
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                }
            }

        },
    }

    if (scale) {
        config.scale = {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    stepSize: 10
                }
            }
        }
    }
    const contentChart = document.getElementById(canvas);

    const observerChart = new IntersectionObserver((contents) => {

        contents.forEach(content => {

            if (content.isIntersecting) {

                try {
                    const chart = new Chart(contentChart, config);
                    chart.canvas.parentNode.style.height = height;
                    chart.canvas.parentNode.style.width = (window.innerWidth < 400) ? width[1] : width[0];
                    chart.options.animation = {
                        duration: 1000,
                        easing: 'easeInOutSine'
                    };

                    charts[canvas] = chart;
                } catch (error) {
                    const copy = charts[canvas].config;

                    charts[canvas].destroy()

                    charts[canvas] = new Chart(contentChart, copy);
                    charts[canvas].canvas.parentNode.style.height = height;
                    charts[canvas].canvas.parentNode.style.width = (window.innerWidth < 400) ? width[1] : width[0];
                    charts[canvas].options.animation = {
                        duration: 2000,
                        easing: 'easeInOutSine'
                    };
                }

            }
        });

    })

    observerChart.observe(contentChart);
}

createGraphic("coneic",
    {
        labels: ["Python", "HTML5", "SCSS", "JavasCript"],
        datasets: [
            {
                label: '% de uso',
                data: [35, 30, 2, 33]
            }
        ]
    },

    'COENIC DISTRIBUTION',
    "doughnut"
);

createGraphic("airchive",
    {
        labels: ["Python", "HTML5", "CSS", "JavasCript", "Bat"],
        datasets: [
            {
                label: '% de uso',
                data: [50, 15, 9, 25, 1]
            }
        ]
    },

    'AIRCHIVE DISTRIBUTION',
    "pie",
    "300px",
    ["400px", "360px"],
    true
);

createGraphic("reactiva",
    {
        labels: ["Python", "HTML5", "SCSS", "JavasCript"],
        datasets: [
            {
                label: '% de uso en web',
                data: [45, 25, 10, 20]
            },
            {
                label: '% de uso en desktop',
                data: [98, 0, 2, 0]
            }
        ]
    },
    'REACTIVA DISTRIBUTION',
    "line",
    "300px",
    ["400px", "360px"],
    true
);

createGraphic("systemas",
    {
        labels: ["Python", "HTML5", "SCSS", "JavasCript", "Otros"],
        datasets: [
            {
                label: '% de uso',
                data: [1.2, 0.9, 27.7, 17.5, 52.7],
                borderRadius: Number.MAX_VALUE,
                borderSkipped: false,
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ]
            }
        ]
    },
    'SYSTE+ DISTRIBUTION',
    "bar",
    "300px",
    ["400px", "360px"],
    true
);


createGraphic("financiApp",
    {
        labels: ["Python", "HTML5", "CSS", "JavasCript", "Bat"],
        datasets: [
            {
                label: '% de uso',
                data: [100, 0, 0, 0, 0],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ]
            }
        ]
    },

    'AIRCHIVE DISTRIBUTION',
    "bar",
    "300px",
    ["400px", "360px"]
);