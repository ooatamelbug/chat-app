import axios from 'axios';

export const EnglishWordChars = async (language, encode) => {
  const data = await axios.get(`${process.env.VERBIX_API}${process.env.VERBIX_API_KEY}/${encode}`);
  return {
    charNumber: data[0].alphabet.length,
    charTypeName: 'basic',
    level: 'basic',
    language,
    levelName: 'basic',
    chars: data[0].alphabet
      
  };
//   return {
//     languageName: langname,
//     encode: encode,
//     charNumber: data[0].alphabet.length,
//     charType: ['normal'],
//     chars: [
//       {
//         charType: 'normal',
//         charNumber: data[0].alphabet.length,
//         charsInType: [
//           {
//             level: 'normal',
//             levelName: 'start',
//             numberInLevel: 26,
//             chars: data[0].alphabet
//           }
//         ]
//       }
//     ]
//   };
}; 

// export const japChars = async () => {
//   const dataChars = await axios.get(`${process.env.JAP_ALPHA_API}all`);
//   const charType = [];
//   const charTypeName = [];
//   for (const key in dataChars.data) {
//     const chars = dataChars.data[key].content.map( jap => {
//       return jap.japanese;
//     });
//     const data = {
//       charType : dataChars.data[key].name,
//       charNumber: chars.length,
//       charsInType: [
//         {
//           level: 'basic',
//           levelName: 'basic',
//           numberInLevel: chars.length,
//           chars 
//         }
//       ]
//     };
//     charType.push(data);
//     charTypeName.push(dataChars.data[key].name);
//   }
//   return {
//     languageName: 'japanese',
//     encode: 'jp',
//     charNumber: 45,
//     charType: [...charTypeName],
//     chars: [
//       ...charType
//     ]      
//   };
// };

export const japChars = async (language) => {
  const dataChars = await axios.get(`${process.env.JAP_ALPHA_API}all`);
  const charType = [];
  const charTypeName = [];
  for (const key in dataChars.data) {
    const chars = dataChars.data[key].content.map( jap => {
      return jap.japanese;
    });
    const data = {
      charTypeName : dataChars.data[key].name,
      charNumber: chars.length,
      level: 'basic',
      language,
      levelName: 'basic',
      chars 
    };
    charType.push(data);
    charTypeName.push(dataChars.data[key].name);
  }
  return {
    charTypeName: [
      ...charType
    ]      
  };
};