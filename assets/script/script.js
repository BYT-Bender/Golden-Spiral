// const parentDir = "/test/";
// var fileName = window.location.pathname.replace(parentDir, '');

// var pageOrder = ["index.html", "golden_ratio.html", "fibonacci_series.html", "golden_spiral.html", "estimation.html", "observation_golden_ratio.html", "nature.html", "photography.html", "architecture.html"];
// const currentPageIndex = pageOrder.indexOf(fileName);
// const totalPages = pageOrder.length;

// prevPageIndex = currentPageIndex - 1;
// nextPageIndex = currentPageIndex + 1;


// document.onkeydown = function (e) {
//     e = e || window.event;

//     if (prevPageIndex >= 0 && e.keyCode == '37') {
//         window.location.href = pageOrder[prevPageIndex];
//     }
//     else if (nextPageIndex <= pageOrder.length - 1  && e.keyCode == '39') {
//         window.location.href = pageOrder[nextPageIndex];
//     }
// };


// const linkBtns = document.querySelectorAll('.linkBtn');
// if (linkBtns) {
//     linkBtns.forEach(function(div) {
//         if (prevPageIndex >= 0 && div.id == "prevPageBtn") {
//             div.setAttribute("data-link", pageOrder[prevPageIndex]);
//         }
//         else if (nextPageIndex <= pageOrder.length - 1  && div.id == "nextPageBtn") {
//             div.setAttribute("data-link", pageOrder[nextPageIndex]);
//         }
//         div.addEventListener('click', function() {
//             var link = this.getAttribute('data-link');
//             if (link) {
//                 window.location.href = link;
//             }
//         });
//     });
// }


// const pageLoc = document.getElementById("pageLoc");

// if (pageLoc) {
//     pageLoc.textContent = `Page ${currentPageIndex + 1} of ${totalPages}`;
// }


window.onload = function() {
    const images = document.querySelectorAll('.lazy-img');
    
    if (images) {
        for (var i = 0; i < images.length; i++) {
            images[i].onload = function() {
                this.classList.remove('lazy-img');
            };
        }
    }
};


document.addEventListener('DOMContentLoaded', function () {
    let currentIndex = 0;
    const contentElements = document.querySelectorAll('.content');
  
    function showContent(index) {
      // Hide all content elements
      contentElements.forEach(element => {
        element.classList.remove('visible');
      });
  
      // Show the specified content element
      contentElements[index].classList.add('visible');
    }
  
    function handleKeyPress(event) {
      if (event.key === 'd' || event.key === 'D') {
        // Move to the next content on "D" key press
        currentIndex = (currentIndex + 1) % contentElements.length;
        showContent(currentIndex);
      } else if (event.key === 'a' || event.key === 'A') {
        // Move to the previous content on "A" key press
        currentIndex = (currentIndex - 1 + contentElements.length) % contentElements.length;
        showContent(currentIndex);
      }

      if (currentIndex == 0 || currentIndex == 5) {
          document.getElementById("bg").style.display = "none";
      } else {
          document.getElementById("bg").style.display = "block";
      }
    }
  
    // Show the initial content
    showContent(currentIndex);
  
    // Listen for key presses
    document.addEventListener('keydown', handleKeyPress);
  });
  

// document.addEventListener('DOMContentLoaded', function () {
//     let currentIndex = 0;
//     const contentElements = document.querySelectorAll('.content');
  
//     function showContent(index) {
//         if (contentElements) {
//             // Hide all content elements
//             contentElements.forEach(element => {
//               element.classList.remove('visible');
//             });
        
//             // Show the specified content element
//             contentElements[index].classList.add('visible');
//         } else {
//             return;
//         }
//     }
  
//     function handleKeyPress(event) {
//       if (event.key === 'd' || event.key === 'D') {
//         // Move to the next content on "D" key press
//         currentIndex = (currentIndex + 1) % contentElements.length;
//         showContent(currentIndex);

//         if (currentIndex === contentElements.length - 1) {
//             // Navigate to another page when the last content is accessed
//             window.location.href = nextPage;
//           }

//       } else if (event.key === 'a' || event.key === 'A') {
//         // Move to the previous content on "A" key press
//         currentIndex = (currentIndex - 1 + contentElements.length) % contentElements.length;
//         showContent(currentIndex);

//         if (currentIndex === contentElements.length - 1) {
//             // Navigate to another page when the last content is accessed
//             window.location.href = prevPage;
//           }

//       }
//     }
  
//     // Show the initial content
//     showContent(currentIndex);
  
//     // Listen for key presses
//     document.addEventListener('keydown', handleKeyPress);
//   });