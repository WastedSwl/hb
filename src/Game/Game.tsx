import React, { useLayoutEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import styles from "./Game.module.css";

const Game: React.FC = () => {
  const appRef = useRef<PIXI.Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInitializedRef = useRef(false);

  // Функция для инициализации приложения PIXI
  const initializePixiApp = async () => {
    if (!containerRef.current || appRef.current) return;
    if (containerRef.current.children.length > 0) return;

    // Создание приложения PIXI
    const app = new PIXI.Application();
    await app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

    // Добавляем canvas в DOM
    containerRef.current.appendChild(app.canvas);
    appRef.current = app;
    console.log("хуй");
    // Инициализируем игровое поле
    const tileTexture = await PIXI.Assets.load("/sprites/tile.png");
    const tileContainer = new PIXI.Container();
    app.stage.addChild(tileContainer);

    const tileSize = 50;
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        const tile = new PIXI.Sprite(tileTexture);
        tile.width = tileSize;
        tile.height = tileSize;
        tile.position.set(i * tileSize, j * tileSize);
        tileContainer.addChild(tile);
      }
    }

    // Возможность перемещения игрового поля
    let dragging = false;
    let startX = 0;
    let startY = 0;

    tileContainer.eventMode = "static";
    tileContainer.on("pointerdown", (event) => {
      dragging = true;
      startX = event.global.x - tileContainer.x;
      startY = event.global.y - tileContainer.y;
    });

    tileContainer.on("pointermove", (event) => {
      if (dragging) {
        tileContainer.x = event.global.x - startX;
        tileContainer.y = event.global.y - startY;
      }
    });

    tileContainer.on("pointerup", () => {
      dragging = false;
    });

    tileContainer.on("pointerupoutside", () => {
      dragging = false;
    });
  };

  useLayoutEffect(() => {
    initializePixiApp();

    return () => {
      if (appRef.current) {
        appRef.current.destroy(true, { children: true });
        appRef.current = null;
      }

      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
      isInitializedRef.current = false;
    };
  }, [initializePixiApp]);

  return <div ref={containerRef} className={styles.gameContainer} />;
};

export default Game;
