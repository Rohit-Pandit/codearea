import Problem from '../models/Problem.model.js';


const getAllProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        if(problems.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No problems found'
            });
        }
        res.status(200).json({
            success: true,
            data: problems,
            message: 'Problems fetched successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: error.message,
                code: error.code
            }
        });
    }
}

const getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if(!problem) {
            return res.status(404).json({
                success: false,
                message: 'Problem not found'
            });
        }
        res.status(200).json({
            success: true,
            data: problem,
            message: 'Problem fetched successfully'
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: {
                message: error.message,
                code: error.code
            }
        });
    }
}

export {getAllProblems, getProblemById};
