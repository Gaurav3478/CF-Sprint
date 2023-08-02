import React from 'react'
import { useState, useEffect } from 'react';

function Table(props) {
    const NUMBER_OF_PROBLEMS = 30;
    const url_tags = 'https://codeforces.com/api/problemset.problems?tags=';
    const url_submissions = 'https://codeforces.com/api/user.status?handle=';
    const [problemsByRating, setProblemsByRating] = useState({});
    const [submissions, setSubmissions] = useState({});
    const solveCounts = {};

    const [updateTable, setUpdateTable] = useState(false);

    const handleUpdateTable = () => {
        setUpdateTable(!updateTable); // Toggle the state to trigger re-render
      };

    useEffect(() => {

    }, [submissions]);

    useEffect(() => {
        setSubmissions({});
        if(props.validUser === 2) {
            const new_submissions = {};
            const url = url_submissions + props.user.handle;
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const submissionsList = data.result;
                submissionsList.forEach((submission) => {
                    if(submission.verdict === "OK") {
                        var str = submission.problem.contestId + '-' + submission.problem.index;
                        new_submissions[str] = true;
                    }
                });
                setSubmissions(new_submissions);
            })
        } 
    }, [props.user, props.validUser, updateTable])


  useEffect(() => {
    fetch(url_tags)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result) {
          //first store all of the problems mapped to their solvecounts
          const problemStatistics = data.result.problemStatistics;
          problemStatistics.forEach((statistic) => {
            if(!solveCounts[statistic.contestId]) {
                solveCounts[statistic.contestId] = {};
            }
            solveCounts[statistic.contestId][statistic.index] = statistic.solvedCount;
          });

          const problems = data.result.problems;
          const new_problemsByRating = {};

          // Group problems by rating
          problems.forEach((problem) => {
            const rating = problem.rating || 'Unrated'; // Use 'Unrated' if no rating is available
            const contestId = problem.contestId;
            const index = problem.index;
            if (!new_problemsByRating[rating]) {
              new_problemsByRating[rating] = [];
            }
            problem.solveCount = solveCounts[contestId][index];
            new_problemsByRating[rating].push({problem});
          });

          for(const rating in new_problemsByRating) {
            new_problemsByRating[rating].sort((a, b) => b.problem.solveCount - a.problem.solveCount);
            new_problemsByRating[rating] = new_problemsByRating[rating].slice(0, NUMBER_OF_PROBLEMS);
          }

          for(const rating in new_problemsByRating) {
            for(let i = 1; i <= NUMBER_OF_PROBLEMS; i++) {
                new_problemsByRating[rating][i - 1].problem.array_index = i;
            }
          }

          setProblemsByRating(new_problemsByRating);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

    const getTopProblems = (rating) => {
        if (!problemsByRating[rating]) {
            return []
        };
        return problemsByRating[rating];
    };

    const navigateToProblem = (contestId, index) => {
        const url = `https://codeforces.com/problemset/problem/${contestId}/${index}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            <div className='text-center'>
                <button   button type="button" className = "btn btn-info text-center myUpdate" onClick={handleUpdateTable}>Update Table</button>
            </div>
        <table className='table table-dark myTable table-container'>
          <thead>
            <tr>
              <th className = 'table-cell'>Index</th>
              <th className = 'table-cell'>Problem</th>
              <th className = 'table-cell'>Solve Count</th>
              <th className = 'table-cell'>Rating</th>
              <th className = 'table-cell'>Tags</th>
            </tr>
          </thead>
          <tbody>   
          {getTopProblems(props.rating).map((problem, index) => (
                <tr key={index} className={(() => {
                    const hasClass = !submissions[`${problem.problem.contestId}-${problem.problem.index}`];
                    return hasClass ? '' : 'bg-success';
                  })()
                  }
                  onClick={() => navigateToProblem(problem.problem.contestId, problem.problem.index)}
                  style={{ cursor: 'pointer' }}>
                  <td>{problem.problem.array_index}</td>
                  <td>{problem.problem.name}</td>
                  <td>{problem.problem.solveCount}</td>
                  <td>{problem.problem.rating}</td>
                  <td>
                    {problem.problem.tags.map((tag, index) => (
                        <span key={index}>
                        {tag}
                        {index !== problem.problem.tags.length - 1 && ", "} {/* Add a comma after each tag except the last one */}
                        </span>
                    ))}
                </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>

      );
};
    
export default Table;