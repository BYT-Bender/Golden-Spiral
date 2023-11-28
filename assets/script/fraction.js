        // Function to process elements with the 'fraction' class
        function processFractions() {
            var fractions = document.querySelectorAll('frac');

            fractions.forEach(function (fractionElement) {
                var numerator = fractionElement.getAttribute('numerator');
                var denominator = fractionElement.getAttribute('denominator');

                if (numerator !== null && denominator !== null) {
                    var fractionHTML = createFraction(numerator, denominator);
                    fractionElement.innerHTML = fractionHTML;
                }
            });
        }

        // Function to generate HTML code for a fraction
        function createFraction(numerator, denominator) {
            return `<span class="frac"><sup>${numerator}</sup><span>&frasl;</span><sub>${denominator}</sub></span>`;
        }

        // Call the function to process elements with the 'fraction' class
        processFractions();