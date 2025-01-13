import { Options, Rect } from "../type/types.ts";

class UseFlip {
    selector: string;
    defaults: Options;

    constructor(selector: string, defaults: Options = {}) {
        this.selector = selector;
        this.defaults = defaults;
    }

    // 获取元素的边界矩形信息并返回包含元素及矩形信息的对象
    rect(el: Element): { el: Element; } & Rect {
        const rect = el.getBoundingClientRect().toJSON();
        return { el,...rect };
    }

    // 获取所有匹配选择器的元素信息数组
    measure(): ({ el: Element; } & Rect)[] {
        return Array.from(document.querySelectorAll(this.selector)).map(this.rect);
    }

    // 记录元素初始位置信息，将初始的left位置信息保存在元素的自定义属性startX上
    record(container: HTMLElement) {
        const all = [...container.children];
        all.forEach((item) => {
            const rect = item.getBoundingClientRect();
            (item as any).startX = rect.left;
        });
    }

    // 改变元素的节点位置，实现随机排序效果
    change(container: HTMLElement) {
        const all = [...container.children];
        const len = all.length;
        all.forEach((item, i) => {
            const newIndex = Math.floor(Math.random() * len);
            if (newIndex!== i) {
                const nextDOM = item.nextElementSibling;
                container.insertBefore(item, all[newIndex]);
                if (nextDOM) {
                    container.insertBefore(all[newIndex], nextDOM);
                } else {
                    container.appendChild(all[newIndex]);
                }
            }
        });
    }

    // 执行动画，根据元素初始位置和当前位置的差异来设置动画关键帧
    play(container: HTMLElement) {
        const all = [...container.children];
        all.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const currentX = rect.left;
            (item as HTMLElement).animate([
                { transform: `translateX(${((item as any).startX - currentX)}px)` },
                { transform: 'translateX(0px)' }
            ], { duration: 600 });
        });
    }

    // 整合操作，在点击按钮等触发时执行记录、改变位置和播放动画这一系列操作
    execute(container: HTMLElement) {
        this.record(container);
        this.change(container);
        this.play(container);
    }
}

export function createUseFlip(selector: string, defaults?: Options) {
    return new UseFlip(selector, defaults);
}
