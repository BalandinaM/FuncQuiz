export const mergeQuestions = (questionsFromState, studiedQuestions) => {
  if (!studiedQuestions || studiedQuestions.length === 0) {
    return questionsFromState;
  }

  return questionsFromState.map(item => {
    const learnedItem = studiedQuestions.find(u => u.id === item.id);
    return learnedItem ? { ...item, ...learnedItem } : item;
  });
};

export const getRandomIndex = (array) => {
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};

export const getQuestion = (selectedCategory, array) => {
	if (selectedCategory == 'all') {
		return getRandomIndex(array.filter((item) => item.isLearn === false))
	} else {
		return getRandomIndex((array.filter((item) => item.category === selectedCategory)).filter((item) => item.isLearn === false))
	}
};
