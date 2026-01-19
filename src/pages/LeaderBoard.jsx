import { useState, useEffect } from "react";
import { allOtherAxiosRequest } from '../api/axios';
import { GiTrophyCup, GiPodiumWinner, GiPodiumSecond, GiPodiumThird } from "react-icons/gi";

import style from '../css/LeaderBoard.module.css'


const Leaderboard = () => {
  const practice_id = JSON.parse(localStorage.getItem('practice_id'))
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLeaderBoardData = async () => {
      try {

        const response = await allOtherAxiosRequest.get(`/api/v1/spelling/leaderBoard/getLeaderBoard/${practice_id}`)
        setLeaderboardData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data: ", error);
        setLoading(false);
      }
    }

    getLeaderBoardData()

  }, [practice_id]);

  if (loading) {
    return <div>Loading...</div>;
  }


  const SortedAndfilterdDaa = leaderboardData
    .sort((a, b) => b.total_score - a.total_score)
    .filter(el => el.total_score !== "0")


  const organisePodium = (el, index) => {
    if (index === 0) {
      return <div key={index}  className={style.eachStudent}>
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
      return <div key={index}  className={style.eachStudent}>
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

      return <div key={index}  className={style.eachStudent}>

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
      return ( <div key={index}  className={style.restOfStudents}>
          <span >{el.name}</span>
          <span >{el.total_score}</span>
        </div>)
    }
  }


  return (
    <div className={`${style.leaderBoard}`}>
      {SortedAndfilterdDaa.map((el, indx) => {

        return organisePodium(el, indx)

      })}
    </div>
  );
};

export default Leaderboard;
