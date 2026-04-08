import { useState, useEffect } from "react";
import { allOtherAxiosRequest } from '../api/axios';
import { GiTrophyCup, GiPodiumWinner, GiPodiumSecond, GiPodiumThird } from "react-icons/gi";


import style from '../css/LeaderBoard.module.css'


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [practiceIds, setPracticeIds] = useState([]);
  const [practice_id, setPracticeId] = useState(null);
  const user = localStorage.getItem('user');

  const school_id = user ? JSON.parse(user).school_id : null;

  useEffect(() => {
    const getAllAssignmentsData = async () => {
      const response = await allOtherAxiosRequest.get(`/api/v1/spelling/words/weeklypractice/all/${school_id}`);

      if (response.status === 200) {
        setPracticeIds(response.data.assignments);
      } else {
        setPracticeIds([])
      }
    }
    if (school_id) {
      getAllAssignmentsData()
    }
  }, [school_id])

  useEffect(() => {
    const getLeaderBoardData = async () => {
      try {

        const response = await allOtherAxiosRequest.get(`/api/v1/spelling/leaderBoard/getLeaderBoard/${practice_id}`)
        setLeaderboardData(response.data.result);
      } catch (error) {
        console.error("Error fetching leaderboard data");
      }
    }

    if (practice_id !== null) {
      getLeaderBoardData();
    }

  }, [practice_id]);


  const handlePracticeChange = (event) => {
    setPracticeId(event.target.value);
  };

  const SortedAndfilterdDaa = leaderboardData
    .sort((a, b) => b.total_score - a.total_score)
    .filter(el => el.total_score !== "0")


  const organisePodium = (el, index) => {
    if (index === 0) {
      return <div key={index} className={style.eachStudent}>
        <div className={style.podium}>
          <GiTrophyCup color="Gold" />
          <GiPodiumWinner color="gold" size="3em" title="first Icon" />
        </div>


        <div className={`${style.score}`}>
          <span >{el.total_score}</span>
        </div>

        <div className={`${style.name}`}>
          <span >{el.name}</span>
        </div>

      </div>

    } else if (index === 1) {
      return <div key={index} className={style.eachStudent}>
        <div className={style.podium}>
          <GiPodiumSecond color="Silver" size="3em" title="Second Icon" />
        </div>

        <div className={`${style.score}`}>
          <span >{el.total_score}</span>
        </div>

        <div className={`${style.name}`}>
          <span >{el.name}</span>
        </div>

      </div>
    } else if (index === 2) {

      return <div key={index} className={style.eachStudent}>

        <div className={style.podium}>
          <GiPodiumThird color="" size="3em" title="third Icon" />
        </div>

        <div className={`${style.score}`}>
          <span >{el.total_score}</span>
        </div>

        <div className={`${style.name}`}>
          <span >{el.name}</span>
        </div>
      </div>
    } else {
      return (<div key={index} className={style.restOfStudents}>
        <span >{el.name}</span>
        <span >{el.total_score}</span>
      </div>)
    }
  }

  return (
    <div className={`${style.leaderBoard}`}>
      {practiceIds.length > 0 && (
        <div className={style.dropdownContainer}>
          <label htmlFor="practice-select">Select Practice: </label>
          <select id="practice-select" onChange={handlePracticeChange} value={practice_id || ''}>
            <option value="" disabled>Select a practice</option>
            {practiceIds.map((practice) => (
              <option key={practice.practice_id} value={practice.practice_id}>{`Practice Title: ${practice.assignment.title}`}</option>

            ))}
          </select>
        </div>
      )}

      {SortedAndfilterdDaa.map((el, indx) => {

        return organisePodium(el, indx)

      })}
    </div>
  );
}

export default Leaderboard;
