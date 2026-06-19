
---

## main.ts

```typescript
/**
 * DimensionCraft
 */

//% color=#6A0DAD icon="\uf1b2"
namespace DimensionCraft {

    export enum Dimension {
        //% block="overworld"
        Overworld,

        //% block="nether"
        Nether,

        //% block="end"
        End
    }

    let currentDimension = Dimension.Overworld
    let playerXP = 0

    //% block="spawn villager at x %x y %y"
    export function spawnVillager(x: number, y: number): Sprite {
        const villager = sprites.create(img`
            . . . 5 5 5 . . .
            . . 5 5 5 5 5 . .
            . 5 5 2 2 2 5 5 .
            . 5 2 2 2 2 2 5 .
            . 5 2 2 2 2 2 5 .
            . . 5 5 5 5 5 . .
            . . . 5 . 5 . . .
            . . . 5 . 5 . . .
        `, SpriteKind.NPC)

        villager.setPosition(x, y)

        game.onUpdateInterval(1000, function () {
            villager.vx = randint(-20, 20)
            villager.vy = randint(-20, 20)
        })

        return villager
    }

    //% block="create portal to %dimension at x %x y %y"
    export function createPortal(
        dimension: Dimension,
        x: number,
        y: number
    ) {
        const portal = sprites.create(img`
            5 5 5 5
            5 1 1 5
            5 1 1 5
            5 5 5 5
        `, SpriteKind.Food)

        portal.setPosition(x, y)

        portal.onOverlap(function(sprite: Sprite, otherSprite: Sprite) {
            currentDimension = dimension

            if (dimension == Dimension.Nether) {
                scene.setBackgroundColor(2)
            } else if (dimension == Dimension.End) {
                scene.setBackgroundColor(1)
            } else {
                scene.setBackgroundColor(7)
            }
        })
    }

    //% block="add xp %amount"
    export function addXP(amount: number) {
        playerXP += amount
    }

    //% block="get xp"
    export function getXP(): number {
        return playerXP
    }

    //% block="open trade menu"
    export function openTradeMenu() {
        game.showLongText(
            "Trade: 5 XP for Emerald",
            DialogLayout.Center
        )

        if (playerXP >= 5) {
            playerXP -= 5
            game.splash("Trade Complete!")
        } else {
            game.splash("Not enough XP!")
        }
    }

    //% block="current dimension"
    export function getDimension(): Dimension {
        return currentDimension
    }
}

namespace SpriteKind {
    export const NPC = SpriteKind.create()
}
