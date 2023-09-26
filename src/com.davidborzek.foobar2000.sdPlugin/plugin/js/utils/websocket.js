let intervals = {};

const websocketUtils = {

  setAsyncTitle: (text, interval, context) => {
    text = ` ${text} `;
    let currentFirstChar = 0;

    intervals[context] = setInterval(() => {
      if (currentFirstChar + 8 > text.length) {
        currentFirstChar = 0;
      }
      $SD.setTitle(
        context,
        text.substring(currentFirstChar, currentFirstChar + 8)
      );
      currentFirstChar++;
    }, interval);
  },

  setAsyncTitleMultiline: (text1, text2, interval, context) => {
    text1 = ` ${text1} `;
    text2 = ` ${text2} `;
    let currentFirstChar1 = 0;
    let currentFirstChar2 = 0;

    intervals[context] = setInterval(() => {
      if(currentFirstChar1 + 8 > text1.length) currentFirstChar1 = 0;
      if(currentFirstChar2 + 8 > text2.length) currentFirstChar2 = 0;
      $SD.setTitle(
        context,
        `${text1.substring(currentFirstChar1, currentFirstChar1 + 8)}\n${text2.substring(currentFirstChar2, currentFirstChar2 + 8)}`
      );
      currentFirstChar1++;
      currentFirstChar2++;
    }, interval);
  },
  
  setFeedback: (context, icon, title, value, indicator) => {
    const payload = {
        'title': title,
        'value': value,
        'indicator': indicator,
        icon
      };
    $SD.setFeedback(context, payload);
  },
};
