const express = require('express');
const body_parser = require('body-parser');

const router = express.Router();
router.use(body_parser.json());
router.use(body_parser.urlencoded({ extended: true }));

const kakao_service = require(__dirname + '/kakao_service.js');

router.post('/start/:user_key/:problem_id/:num_of_elevators', (req, res) => {
    const user_key = req.params['user_key'];
    const problem_id = parseInt(req.params['problem_id']);
    const num_of_elevators = parseInt(req.params['num_of_elevators']);

    if (!user_key) { res.sendStatus(401); return; }
    if (isNaN(problem_id)) { res.sendStatus(400); return; }
    if (isNaN(num_of_elevators)) { res.sendStatus(400); return; }

    const result = kakao_service.start(user_key, problem_id, num_of_elevators);
    if (result.status != 200) { res.sendStatus(result.status); return; }
    
    res.json(result.body);
});

router.get('/oncalls', (req, res) => {
    const token = req.headers['x-auth-token'];

    if (!token) { res.sendStatus(401); return; }

    const result = kakao_service.onCalls(token);
    if (result.status != 200) { res.sendStatus(result.status); return; }
    
    res.json(result.body);
});

router.post('/action', (req, res) => {
    const token = req.headers['x-auth-token'];
    
    if (!token) { res.sendStatus(401); return; }
    if (!req.is('application/json')) { res.sendStatus(406); return; }
    
    const result = kakao_service.action(token, req.body);
    if (result.status != 200) { res.sendStatus(result.status); return; }
    
    res.json(result.body);
});

module.exports = router;