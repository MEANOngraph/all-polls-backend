const pollsModel = require('../models/polls');
const pollsService = require('../services/polls');
const validator = require('../helpers/validate');

const getPollsList = async(req, res, next)=>{
    try{
        const userId = req.params.userId;
        if(userId){
            const response = await pollsService.getAllPolls(userId);
            if(response){
                res.send(200).json({ success: true, response: response});
            }else{
                res.send(200).json({ success: false, msg: 'Something went wrong!'});
            }
        }else{
            res.send(400).json({ success: false, msg: 'Invalid user Id.'});
        }
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
        };

        await validator(req.body, validationRule, {}, async (err, status) => {
            if (err) {
                res.status(412)
                    .send({
                        success: false,
                        message: 'Validation failed!',
                        data: err
                    });
            } else {
                const response = pollsService.createUserPoll(userId, question, options);
                if(response){
                    res.send(200).json({ success: true, msg: 'Poll created succesfully.'});
                }else{
                    res.send(200).json({ success: false, msg: 'Something went wrong!'});
                }
            }
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
                res.send(200).json({ success: true, msg: 'This poll is no longer active.'});
            }else{
                res.send(200).json({ success: false, msg: 'Something went wrong!'});
            }
        }else{
            res.send(400).json({ success: false, msg: 'Invalid poll Id!'});
        }
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }

}

const getPoll = async(req, res, next)=>{
    try{
        const pollId = req.params.pollId;
        if(pollId){
            const response = await pollsService.getPollDetails(pollId);
            if(response){
                res.send(200).json({ success: true, response: response});
            }else{
                res.send(200).json({ success: false, msg: 'Something went wrong!'});
            }
        }else{
            res.send(400).json({ success: false, msg: 'Invalid poll Id!'});
        }
    }catch (error) {
        console.error(error);
        res.status(200).json({ success: false, msg: 'Something went wrong!'});
    }
}

module.exports={
    getPollsList,
    createPoll,
    changePollStatus,
    getPoll
}