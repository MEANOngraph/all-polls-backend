var pollsModel = require('../models/polls');

const getAllPolls = async (filter,options) => {
    return await pollsModel.find(filter,{},options);
}

const createUserPoll = async (userId, question, options) => {
      let value=[];
      options.forEach((element,index) => {
        value.push({value:element.choice,id:index+1,count:0})
      });
    return await pollsModel.create({ 
        "userId": userId,
        "question": question,
        "options":value
    })
}

const changeStatusOfpoll = async (pollId) => {
    return await pollsModel.findOneAndUpdate({"_id": pollId}, {"status": false});
}

const getPollDetails = async (pollId) => {
    return await pollsModel.findOne({"_id": pollId});
}

const submitPollAns = async (userId, pollId, selectOptId, visitorId) => {
    return await pollsModel.findOneAndUpdate({"_id": pollId, "options.id": selectOptId}, {$inc:{"options.$.count": 1}, $push:{visitors:visitorId}});
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