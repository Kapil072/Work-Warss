import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

// Game constants
const GRID_SIZE = 20;
const CELL_SIZE = 15;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;

// Direction constants
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

type Position = {
  x: number;
  y: number;
};

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastDirection, setLastDirection] = useState(DIRECTIONS.RIGHT);
  const gameLoopRef = useRef<number>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    return newFood;
  }, []);

  const wrapPosition = (pos: Position): Position => {
    let x = pos.x;
    let y = pos.y;

    // Wrap around horizontally
    if (x < 0) x = GRID_SIZE - 1;
    if (x >= GRID_SIZE) x = 0;

    // Wrap around vertically
    if (y < 0) y = GRID_SIZE - 1;
    if (y >= GRID_SIZE) y = 0;

    return { x, y };
  };

  const checkCollision = useCallback((head: Position) => {
    // Only check self collision
    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }
    return false;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !isPlaying) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = { ...newSnake[0] };

      // Move head
      head.x += direction.x;
      head.y += direction.y;

      // Wrap around the grid
      const wrappedHead = wrapPosition(head);

      // Check self collision
      if (checkCollision(wrappedHead)) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check food collision
      if (wrappedHead.x === food.x && wrappedHead.y === food.y) {
        setScore(prev => prev + 1);
        setFood(generateFood());
        setSpeed(prev => Math.max(prev - SPEED_INCREMENT, 50));
      } else {
        newSnake.pop();
      }

      setLastDirection(direction);
      return [wrappedHead, ...newSnake];
    });
  }, [direction, food, gameOver, isPaused, isPlaying, checkCollision, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (lastDirection !== DIRECTIONS.DOWN) {
            setDirection(DIRECTIONS.UP);
          }
          break;
        case 'ArrowDown':
          if (lastDirection !== DIRECTIONS.UP) {
            setDirection(DIRECTIONS.DOWN);
          }
          break;
        case 'ArrowLeft':
          if (lastDirection !== DIRECTIONS.RIGHT) {
            setDirection(DIRECTIONS.LEFT);
          }
          break;
        case 'ArrowRight':
          if (lastDirection !== DIRECTIONS.LEFT) {
            setDirection(DIRECTIONS.RIGHT);
          }
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lastDirection, isPlaying]);

  useEffect(() => {
    if (!gameOver && !isPaused && isPlaying) {
      gameLoopRef.current = window.setInterval(moveSnake, speed);
    }
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, [moveSnake, gameOver, isPaused, isPlaying, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake with gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#10B981'); // emerald-500
    gradient.addColorStop(1, '#059669'); // emerald-600

    snake.forEach((segment, index) => {
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;
      
      // Draw segment with rounded corners
      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.roundRect(x, y, CELL_SIZE - 1, CELL_SIZE - 1, 4);
      ctx.fill();

      // Add shine effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.roundRect(x + 2, y + 2, CELL_SIZE - 5, CELL_SIZE - 5, 2);
      ctx.fill();
    });

    // Draw food with glow effect
    ctx.beginPath();
    ctx.fillStyle = '#EF4444'; // red-500
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE/2,
      food.y * CELL_SIZE + CELL_SIZE/2,
      CELL_SIZE/2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Add glow effect to food
    ctx.shadowColor = '#EF4444';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE/2,
      food.y * CELL_SIZE + CELL_SIZE/2,
      CELL_SIZE/2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.shadowBlur = 0;

  }, [snake, food]);

  const startGame = () => {
    setIsPlaying(true);
    setIsPaused(false);
    setGameOver(false);
  };

  const restartGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection(DIRECTIONS.RIGHT);
    setLastDirection(DIRECTIONS.RIGHT);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setGameOver(false);
    setFood(generateFood());
    setIsPaused(false);
    setIsPlaying(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex justify-between w-full max-w-xs mb-2">
        <div className="font-semibold text-emerald-700">Score: {score}</div>
        {isPlaying && (
          <button
            className="px-4 py-1 bg-emerald-500 text-white rounded-full text-sm hover:bg-emerald-600 transition"
            onClick={() => setIsPaused(prev => !prev)}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="rounded-lg"
        />
        {!isPlaying && !gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <button
              className="p-4 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-all duration-300 hover:scale-110"
              onClick={startGame}
            >
              <Play className="w-8 h-8" />
            </button>
          </div>
        )}
        {gameOver && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
            <div className="bg-white p-6 rounded-lg text-center">
              <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
              <p className="text-lg mb-4">Score: {score}</p>
              <button
                className="px-6 py-2 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition flex items-center gap-2 mx-auto"
                onClick={restartGame}
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        {isPlaying ? 'Use arrow keys to move • Space to pause' : 'Click play to start'}
      </div>
    </div>
  );
};

export default SnakeGame; 