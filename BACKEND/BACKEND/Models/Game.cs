namespace BACKEND.Models
{
    public class Game
    {
        public string[][] CurrentState { get; set; }
        public int? NumOfCoins { get; set; }
        public bool IsInPlay { get; set; }
    }
}
