const asyncHandler = require('../middlewares/asyncHandler.js');
const Observer = require('../models/observerModel.js');

exports.updateViews = asyncHandler(async (req, res, next) => {
  const observer = await Observer.findByIdAndUpdate(
    '63f8cf3f3b28178e037c263d',
    { $inc: { views: 1 } },
    { new: true }
  );
  next();
});

exports.checkNewDay = asyncHandler(async (req, res, next) => {
  const { requestDate } = await Observer.findById('63f8cf3f3b28178e037c263d');
  if (isNewDay(requestDate))
    await Observer.findByIdAndUpdate('63f8cf3f3b28178e037c263d', {
      views: 0,
      requestDate: Date.now()
    });
  next();
});

const isNewDay = oldDate => {
  // const diffTime = new Date('02/24/2023') - oldDate;
  const diffTime = Date.now() - oldDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 1;
};
