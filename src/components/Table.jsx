import React from 'react'
import { useState, useEffect } from 'react';

function Table(props) {
    const NUMBER_OF_PROBLEMS = 30;
    const url_tags = 'https://codeforces.com/api/problemset.problems?tags=';
    const url_submissions = 'https://codeforces.com/api/user.status?handle=';
    const [problemsByRating, setProblemsByRating] = useState({});
    const [submissions, setSubmissions] = useState({});
    const solveCounts = {};

    useEffect(() => {
        // Update the state with the new submissions list when it changes
        setSubmissions(submissions);
      }, [submissions]);

    useEffect(() => {
        setSubmissions({});
        if(props.validUser === 2) {
            const url = url_submissions + props.user.handle;
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const submissionsList = data.result;
                submissionsList.forEach((submission) => {
                    if(submission.verdict == "OK") {
                        if(!submissions[submission.problem.contestId]) {
                            submissions[submission.problem.contestId] = {};
                        }
                        submissions[submission.problem.contestId][submission.problem.index] = true;
                    }
                });
            })
            console.log(submissions);
        } 
    }, [props.user])


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
          const problemsByRating = {};

          // Group problems by rating
          problems.forEach((problem) => {
            const rating = problem.rating || 'Unrated'; // Use 'Unrated' if no rating is available
            const contestId = problem.contestId;
            const index = problem.index;
            if (!problemsByRating[rating]) {
              problemsByRating[rating] = [];
            }
            problem.solveCount = solveCounts[contestId][index];
            problemsByRating[rating].push({problem});
          });

          setProblemsByRating(problemsByRating);
          for(const rating in problemsByRating) {
            problemsByRating[rating].sort((a, b) => b.problem.solveCount - a.problem.solveCount);
            problemsByRating[rating] = problemsByRating[rating].slice(0, NUMBER_OF_PROBLEMS);
          }

          for(const rating in problemsByRating) {
            for(let i = 1; i <= NUMBER_OF_PROBLEMS; i++) {
                problemsByRating[rating][i - 1].problem.array_index = i;
            }
          }

          console.log(problemsByRating);
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

    return (
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
                <tr key={index} className={
                    !submissions.hasOwnProperty(problem.problem.contestId) ||
                    !submissions[problem.problem.contestId].hasOwnProperty(
                      problem.problem.index
                    )
                      ? ''
                      : 'bg-success'
                  }>
                  {/* <tr key = {index} className={props.user.handle === 'Gaurav3478' ? `bg-success` : ``}> */}
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
      );
};
    
export default Table;