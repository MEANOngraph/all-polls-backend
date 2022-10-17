const pollsModel = require('../models/polls');
const pollsService = require('../services/polls');
const validator = require('../helpers/validate');

const getPollsList = async(req, res, next)=>{
    try{
        const userId = req.params.userId;
        if(userId){
            const response = await pollsService.getAllPolls(userId);
            if(response){
                return res.status(200).json({success: true, msg: 'Polls data fetch succesfully.', response: response});
            }
            return res.status(200).json({success: false, msg: 'Something went wrong!'});
        }
        res.status(400).json({success: false, msg: 'Invalid user Id.'});
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}

const createPoll = async(req, res, next)=>{
    try {
        const { userId, question, options} = req.body;
        const validationRule = {
            "userId": "required|string",
            "question": "required|string",
            "options": "required"
        };

        await validator(req.body, validationRule, {}, async (err, status) => {
            if (err) {
                return res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed!',
                        data: err
                    });
            } 
            const response = pollsService.createUserPoll(userId, question, options);
            if(response){
                return res.status(200).json({ success: true, msg: 'Poll created succesfully.'});
            }
            return res.status(400).json({ success: false, msg: 'Something went wrong!'});
        }).catch( err => console.log(err))   
    } catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}
const changePollStatus = async(req, res, next)=>{
    try{
        const pollId = req.params.pollId;
        if(pollId){
            const response = await pollsService.changeStatusOfpoll(pollId);
            if(response){
                return res.status(200).json({ success: true, msg: 'This poll is no longer active.'});
            }
            return res.status(200).json({ success: false, msg: 'Something went wrong!'});
        }
        res.status(400).json({ success: false, msg: 'Invalid poll id!'});
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }

}

const getPollDetails = async (req, res, next) => {
    try{
        const pollId = req.params.pollId;
        if(pollId){
            const response = await pollsService.getPollDetails(pollId);
            console.log(response);
            if(response){
                return res.status(200).json({success: true, msg: 'Poll data fetch succesfully.', response: response});
            }
            return res.status(400).json({ success: false, msg: 'Something went wrong!'});
        }
        res.status(200).json({ success: false, msg: 'Invalid poll id!'});
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}

const submitPoll = async (req, res, next) =>{
    try{
        const { userId, pollId, selectOptId} = req.body;

        if(pollId){
            const response = await pollsService.submitPollAns(userId, pollId, selectOptId);
            if(response){
                return res.status(200).json({success: true, msg: 'Poll submited succesfully.'});
            }
            return res.status(400).json({ success: false, msg: 'Something went wrong!'});
        }
        res.status(400).json({ success: false, msg: 'Invalid poll id!'});
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}

const deletePoll = async (req, res, next) => {
    try{
        const pollId = req.params.pollId;
        if(pollId){
            const response = await pollsService.deletePoll(pollId);
            if(response){
                return res.status(200).json({ success: true, msg: 'Poll deleted succesfully.'});
            }
            return res.status(200).json({ success: false, msg: 'Something went wrong!'});
        }
        res.status(400).json({ success: false, msg: 'Invalid poll Id.'});
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}

const searchPolls = async (req, res, next) => {
    try{
        const query = req.params.query;
        if(query){
            const response = await pollsService.searchPollsData(query);
            console.log('resssssss', response);
            if(response){
                return res.status(200).json({success: true, msg: 'Search result fetch succesfully.', response: response});
            }
             return res.status(200).json({ success: false, msg: 'Something went wrong!'});
        }
        res.status(400).json({ success: false, msg: 'Invalid input!'});
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}

module.exports={
    getPollsList,
    createPoll,
    changePollStatus,
    getPollDetails,
    submitPoll,
    deletePoll,
    searchPolls
}