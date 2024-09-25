import React, { useLayoutEffect, useRef, useState } from "react";
import * as PIXI from "pixi.js";
import styles from "./Game.module.css";

const Game: React.FC = () => {
  const appRef = useRef<PIXI.Application | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    tileX: number;
    tileY: number;
  } | null>(null);
  const [contextMenuTimer, setContextMenuTimer] =
    useState<NodeJS.Timeout | null>(null); // Для хранения таймера

  const initializePixiApp = async () => {
    if (!containerRef.current || appRef.current) return;

    const app = new PIXI.Application();
    await app.init({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x1099bb,
      resolution: window.devicePixelRatio || 1,
    });

    containerRef.current.appendChild(app.canvas);
    appRef.current = app;

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
        tile.eventMode = "static";
        tile.cursor = "pointer";

        // Добавляем обработку наведения на клетку
        tile.on("pointerover", () => {
          tile.alpha = 0.8; // Уменьшение прозрачности при наведении

          // Очищаем предыдущий таймер, если есть
          if (contextMenuTimer) {
            clearTimeout(contextMenuTimer);
            setContextMenuTimer(null);
          }

          // Задаём таймер для показа контекстного меню с задержкой
          const timer = setTimeout(() => {
            const tilePos = tile.getGlobalPosition();
            setContextMenu({
              x: tilePos.x + tileSize,
              y: tilePos.y + tileSize,
              tileX: i,
              tileY: j,
            });
          }, 500); // Задержка в 500 мс

          setContextMenuTimer(timer);
        });

        tile.on("pointerout", () => {
          tile.alpha = 1; // Восстановление прозрачности

          // Если курсор уходит с клетки, очищаем таймер и скрываем меню
          if (contextMenuTimer) {
            clearTimeout(contextMenuTimer);
            setContextMenuTimer(null);
          }
          setContextMenu(null);
        });

        tileContainer.addChild(tile);
      }
    }

    // Перемещение игрового поля
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

      // Очищаем таймер при размонтировании компонента
      if (contextMenuTimer) {
        clearTimeout(contextMenuTimer);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.gameContainer}>
      {contextMenu && (
        <div
          className={styles.contextMenu}
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
        >
          X = {contextMenu.tileX}
          {"\n"}Y = {contextMenu.tileY}
        </div>
      )}
    </div>
  );
};

export default Game;
