import { Style, Avatar } from "@dicebear/core";
import definition from "../data/dicebear/mafia-cats-style.json" with { type: "json" };

const style = new Style(definition);

export function generateAvatar(name) {
    const avatar = new Avatar(style, {
        seed: name,
        size: 512
    });

    return avatar.toString();
}