using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class GameApiController : ControllerBase
    {
        [HttpPost("{moves}")]
        public Game? ValidateMoves(string moves, [FromBody] Game g)
        {
            Game res = new Game();
            Tuple<int, int> currentLoc = CurrentLocation(g);
            if(currentLoc.Item1 != -1 && currentLoc.Item2 != -1)
            {
                //Az indexelés fordítva tehát [y][x] mivel tömbök vannak a tömbökben
                //ezért az y mutatja meg hogy melyik sor és az az x hogy azon belül melyik
                string[] tmp = moves.Split(',');
                int x = currentLoc.Item1;
                int y = currentLoc.Item2;
                int i = 0;
                while(i<tmp.Length && g.IsInPlay)
                {
                    if (tmp[i].ToUpper() == "F") --y;
                    else if (tmp[i].ToUpper() == "L") ++y;
                    else if (tmp[i].ToUpper() == "J") ++x;
                    else if (tmp[i].ToUpper() == "B") --x;

                    if (x < 0) x = 0;
                    else if (x > 8) x = 8;
                    if (y < 0) y = 0;
                    else if (y > 8) y = 8;

                    if (g.CurrentState[y][x] == "B") g.IsInPlay = false;
                        ++i;
                }
                if (g.IsInPlay)
                {
                    g.CurrentState[currentLoc.Item2][currentLoc.Item1] = "-";
                    if (g.CurrentState[y][x] == "C") ++g.NumOfCoins;
                    g.CurrentState[y][x] = "P";
                }
                res.CurrentState = g.CurrentState;
                res.NumOfCoins = g.NumOfCoins;
                res.IsInPlay = g.IsInPlay;
                return res;

            }
            else {
                g.IsInPlay = false;
                res.CurrentState = g.CurrentState;
                res.NumOfCoins = g.NumOfCoins;
                res.IsInPlay = g.IsInPlay;
                return res;
            }
        }
        public Tuple<int,int> CurrentLocation(Game g)
        {
            Tuple<int, int> res = new Tuple<int, int>(-1,-1);
            for (int i = 0; i < g.CurrentState[0].Length; i++)
            {
                for (int j = 0; j < g.CurrentState[1].Length; j++)
                {
                    if (g.CurrentState[i][j] == "P")
                    {
                        return (new Tuple<int, int>(j, i));
                    }
                }
            }
            return res;
        }
    }
}
