var pollsModel = require('../models/polls');

const getAllPolls = async (userId) => {
    return await pollsModel.find({ "userId": userId });
}

const createUserPoll = async (userId, question, options) => {
    return await pollsModel.create({ 
        "userId": userId,
        "question": question,
        "options":options,
        "status": true
    })
}

const changeStatusOfpoll = async (pollId) => {
    return await pollsModel.findOneAndUpdate({"_id": pollId}, {"status": false});
}

const getPollDetails = async (pollId) => {
    return await pollsModel.findOne({"_id": pollId});
}

const submitPollAns = async (userId, pollId, selectOptId) => {
    return await pollsModel.findOneAndUpdate({"_id": pollId, "userId": userId, "options[selectOptId-1].id": selectOptId}, {$set:{"options[selectOptId-1].count": 1}});
}

const deletePoll = async (pollId) => {
    return await pollsModel.deleteOne({"_id": pollId});
}

const searchPollsData = async (searchQuery) => {
    return await pollsModel.find({"question": {$regex : searchQuery, $options:'i'}});
}

module.exports={
    getAllPolls,
    createUserPoll,
    changeStatusOfpoll,
    getPollDetails,
    submitPollAns,
    deletePoll,
    searchPollsData
}