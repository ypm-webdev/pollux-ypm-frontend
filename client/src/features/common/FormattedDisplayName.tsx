import React from 'react';
import sanitizeHtml from 'sanitize-html'

interface SanitizeProps {
  text: string;
}

const formattedDisplayName = ({ text }: SanitizeProps) => {

  // Format text string to display proper scientific binomial nomenclature (species / scientific names)
  // can handle sp., ssp. or variations

// since we're returning HTML, we need to sanitize it to prevent XSS attacks
// all we're really doing is adding <i> tags around the genus and species, so we can allow only <i> tags and no attributes
    const sanitizeOptions = {
        allowedTags: ['i'],
        allowedAttributes: {
        'i': ['className', 'style']
        }
    };

//   const binomialRegex = /\b([A-Z](?:[a-z]+|\.))(?:\s+(?!(?:s?sp\.))([a-z]+))?(?:\s+(s?sp\.))?\b/g;
  const binomialRegex = /\b([A-Z](?:[a-z]+|\.))(?:\s+(?!(?:s?s?pp?\.))([a-z]+))?(?:\s+(?!(?:s?s?pp?\.))([a-z]+))?(?:\s+(s?s?pp?\.))?\b/g;

  const formatted = text.replace(binomialRegex, (match, genus, species, subspecies, marker) => {
    // Start italics with Genus
    let italicPart = `<i>${genus}`;
    
    // Add species if it exists (and it won't be "sp." because of our regex)
    if (species) italicPart += ` ${species}`;
    
    // Add subspecies if it exists
    if (subspecies) italicPart += ` ${subspecies}`;
    
    italicPart += `</i>`;

    // Add the marker outside the italics
    return marker ? `${italicPart} ${marker}` : italicPart;
  });
  const cleanHtml = sanitizeHtml(formatted, sanitizeOptions);

  return (
    <span 
      className="formatted-display-name"
      dangerouslySetInnerHTML={{ __html: cleanHtml }} 
    />
  );
}

export default formattedDisplayName;






// ALTERNATE:  IF AUTHOR IS PART OF SCIENTIFIC NAME (NOT ITALICIZED)

// const binomialRegex = /\b([A-Z](?:[a-z]+|\.))(?:\s+(?!(?:s?s?pp?\.))([a-z]+))?(?:\s+(?!(?:s?s?pp?\.))([a-z]+))?(?:\s+(s?s?pp?\.))?(?:\s+([A-Z][a-z]*\.?))?\b/g;

// return text.replace(bioRegex, (match, genus, species, subspecies, marker, author) => {
//     // 1. Gather all name parts for italics (Genus, Species, Subspecies)
//     let italicParts = [genus, species, subspecies].filter(Boolean);
//     let result = `<i>${italicParts.join(' ')}</i>`;
    
//     // 2. Append the "sp." marker outside if it exists
//     if (marker) result += ` ${marker}`;
    
//     // 3. Append the Author citation outside if it exists
//     if (author) result += ` ${author}`;
    
//     return result;
//   });