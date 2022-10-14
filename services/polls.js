var pollsModel = require('../models/polls');

const getAllPolls = async (userId) => {
    try{
        await pollsModel.find({ userId: userId }).then(async (err, polls) => {
            if(!err){
                return polls;
            }else{
                console.error(err);
                return;
            }
        })
    }catch(err){
        console.error(err);
        return;
    }
}

const createUserPoll = async (userId, question, options) => {
    try{
        await pollsModel.insertOne({ 
            userId: userId,
            question: question,
            options:options,
            status: true
            }).then(async (err, res) => {
            if(!err){
                return res;
            }else{
                console.error(err);
                return;
            }
        })
    }catch(err){
        console.error(err);
        return;
    }
}

const changeStatusOfpoll = async (pollId) => { 
    try{
        await pollsModel.findOneAndUpdate({_id: pollId}, {status: false}).then(async (err, res) => {
            if(!err){
                return res;
            }else{
                console.error(err);
                return;
            };
        })
    }catch(err){
        console.log(err);
        return;
    }
}

const getPollDetails = async (pollId) => {
    try{
        await pollsModel.findOne({ _id: pollId }).then(async (err, poll) => {
            if(!err){
                return poll;
            }else{
                console.error(err);
                return;
            }
        })
    }catch(err){
        console.error(err);
        return;
    }
}

module.exports={
    getAllPolls,
    createUserPoll,
    changeStatusOfpoll,
    getPollDetails
}