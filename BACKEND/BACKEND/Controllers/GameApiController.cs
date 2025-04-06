using BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace BACKEND.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class GameApiController
    {
        [HttpGet("{moves}")]
        public Game ValidateMoves([FromBody] Game g, string moves)
        {
            Game res = new Game();
            Tuple<int, int> currentLoc = CurrentLocation(g);
            if(currentLoc.Item1 != -1 && currentLoc.Item2 != -1)
            {
                string[] tmp = moves.Split(',');
                int x = currentLoc.Item1;
                int y = currentLoc.Item2;
                int i = 0;
                while(i<tmp.Length && g.IsInPlay)
                {
                    if (tmp[i].ToUpper() == "F") --y;
                    else if (tmp[i].ToUpper() == "L") ++y;
                    else if (tmp[i].ToUpper() == "J") ++x;
                    else if (tmp[i].ToUpper() == "B") --y;

                    if (x < 0) x = 0;
                    else if (x > 8) x = 8;
                    if (y < 0) y = 0;
                    else if (y > 8) y = 8;

                    if (g.CurrentState[x, y] == '¤') g.IsInPlay = false;
                        ++i;
                }
            }
            return res;
        }
        public Tuple<int,int> CurrentLocation(Game g)
        {
            Tuple<int, int> res = new Tuple<int, int>(-1,-1);
            for (int i = 0; i < g.CurrentState.GetLength(0); i++)
            {
                for (int j = 0; j < g.CurrentState.GetLength(1); j++)
                {
                    if (g.CurrentState[i,j] == '█')
                    {
                        return (new Tuple<int, int>(i, j));
                    }
                }
            }
            return res;
        }
    }
}
