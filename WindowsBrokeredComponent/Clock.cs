namespace WindowsBrokeredComponent
{
    using System;
    using System.Threading;

    public static class Clock
    {
        private static Timer timer;
        public static event EventHandler<TickInfo> Tick;

        public static void Enable()
        {
            if (timer == null)
            {
                timer = new Timer(Timer, null, 0, 1000);
            }
        }

        public static void Disable()
        {
            if (timer != null)
            {
                timer.Dispose();
                timer = null;
            }
        }

        private static void Timer(object state)
        {
            if (Tick != null)
            {
                Tick(null, new TickInfo()
                {
                    Date = DateTime.Now.ToLongDateString(),
                    Time = DateTime.Now.ToLongTimeString()
                });
            }
        }
    }
}
