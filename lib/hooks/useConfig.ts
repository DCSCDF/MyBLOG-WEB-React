"use client";

import {useState, useEffect} from "react";
import {configApi, ConfigItem} from "@/lib/api/config";

export interface HeroConfig {
    title: string;
    content: string;
    githubLink: string;
}

export interface LinksConfig {
    content: string;
    codeInfo: string;
}

export interface AppConfig {
    hero: HeroConfig;
    links: LinksConfig;
}

const DEFAULT_HERO_CONFIG: HeroConfig = {
    title: "Hero Title",
    content: "A simple website.",
    githubLink: "https://github.com",
};

const DEFAULT_LINKS_CONFIG: LinksConfig = {
    content: "<p>请提前添加本站，我将会很快处理。</p>",
    codeInfo: "",
};

export const useConfig = () => {
    const [config, setConfig] = useState<AppConfig>({
        hero: DEFAULT_HERO_CONFIG,
        links: DEFAULT_LINKS_CONFIG,
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                setIsLoading(true);
                const response = await configApi.getConfigsByKeys([
                    "hero.title",
                    "hero.content",
                    "hero.githubLink",
                    "links.content",
                    "links.codeInfo",
                ]);

                if (response.success && response.data) {
                    const configMap = new Map<string, string>();
                    response.data.forEach((item: ConfigItem) => {
                        configMap.set(item.configKey, item.configValue);
                    });

                    setConfig({
                        hero: {
                            title: configMap.get("hero.title") || DEFAULT_HERO_CONFIG.title,
                            content: configMap.get("hero.content") || DEFAULT_HERO_CONFIG.content,
                            githubLink: configMap.get("hero.githubLink") || DEFAULT_HERO_CONFIG.githubLink,
                        },
                        links: {
                            content: configMap.get("links.content") || DEFAULT_LINKS_CONFIG.content,
                            codeInfo: configMap.get("links.codeInfo") || DEFAULT_LINKS_CONFIG.codeInfo,
                        },
                    });
                }
                setError(null);
            } catch (err) {
                setError("获取配置失败" + err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig().then();
    }, []);

    return {config, isLoading, error};
};