import axios from 'axios';

const JUDGE_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE_API_KEY = import.meta.env.VITE_JUDGE_API_KEY;

const headers = {
  'X-RapidAPI-Key': JUDGE_API_KEY,
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

export const submitCode = async (sourceCode) => {
  try {
    // Submit the code
    const submission = await axios.post(`${JUDGE_API_URL}/submissions`, {
      source_code: sourceCode,
      language_id: 60, // Go (1.13.5)
      stdin: ''
    }, { headers });

    const token = submission.data.token;

    // Wait for the result
    let result;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      const response = await axios.get(`${JUDGE_API_URL}/submissions/${token}`, { headers });
      
      if (response.data.status.id > 2) { // Not queued or processing
        result = response.data;
        break;
      }

      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second
      attempts++;
    }

    if (!result) {
      throw new Error('Execution timed out');
    }

    return {
      success: result.status.id === 3, // 3 = Accepted
      output: result.stdout || result.stderr || result.compile_output || 'No output',
      error: result.stderr || result.compile_output || null,
      statusId: result.status.id
    };
  } catch (error) {
    console.error('Error executing code:', error);
    return {
      success: false,
      output: null,
      error: error.message || 'Failed to execute code',
      statusId: null
    };
  }
};