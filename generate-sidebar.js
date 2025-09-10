const fs = require('fs').promises;
const path = require('path');

// 命令行参数处理：获取要扫描的文件夹路径，默认是当前目录
const targetDir = process.argv[2] || process.cwd();

/**
 * 递归扫描目录，收集符合条件的Markdown文件
 * @param {string} dir - 要扫描的目录
 * @param {string} baseDir - 基础目录，用于计算相对路径
 * @returns {Promise<Array>} - 文件结构数组
 */
async function scanDirectory(dir, baseDir = dir) {
    const results = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = path.relative(baseDir, fullPath);

        // 忽略以_开头的文件和目录
        if (entry.name.startsWith('_') || entry.name.startsWith('README')) {
            continue;
        }

        if (entry.isDirectory()) {
            // 递归处理子目录
            const subDirFiles = await scanDirectory(fullPath, baseDir);
            if (subDirFiles.length > 0) {
                results.push({
                    type: 'directory',
                    name: entry.name,
                    path: relativePath,
                    children: subDirFiles
                });
            }
        } else if (entry.isFile() && path.extname(entry.name) === '.md') {
            // 处理Markdown文件
            results.push({
                type: 'file',
                name: path.basename(entry.name, '.md'), // 去除.md扩展名
                path: relativePath
            });
        }
    }

    // 排序逻辑：
    // 1. 文件夹(directory)排在文件(file)前面
    // 2. 同一类型的按名称首字母顺序排序（支持国际化）
    return results.sort((a, b) => {
        // 先按类型排序：文件夹在前，文件在后
        if (a.type !== b.type) {
            return a.type === 'directory' ? -1 : 1;
        }

        // 再按名称首字母排序，使用localeCompare确保正确的字母顺序
        return a.name.localeCompare(b.name, undefined, {
            sensitivity: 'base', // 不区分大小写
            numeric: true // 正确处理包含数字的名称
        });
    });
}

/**
 * 将文件结构转换为docsify侧边栏格式的Markdown
 * @param {Array} items - 文件结构数组
 * @param {number} level - 层级，用于生成缩进
 * @returns {string} - 侧边栏Markdown内容
 */
function generateSidebarMarkdown(items, level = 0) {
    const indent = '  '.repeat(level);
    let markdown = '';

    for (const item of items) {
        if (item.type === 'directory') {
            // 目录项
            markdown += `${indent}- [${item.name}](${item.path}/)\n`;
            // 递归处理子项，层级+1
            markdown += generateSidebarMarkdown(item.children, level + 1);
        } else if (item.type === 'file') {
            // 文件项
            markdown += `${indent}- [${item.name}](${item.path})\n`;
        }
    }

    return markdown;
}

/**
 * 主函数：扫描目录并生成侧边栏文件
 */
async function main() {
    try {
        console.log(`开始扫描目录: ${targetDir}`);

        // 扫描目录获取文件结构
        const fileStructure = await scanDirectory(targetDir);

        // 生成侧边栏Markdown内容
        const sidebarContent = generateSidebarMarkdown(fileStructure);

        // 输出文件路径
        const outputPath = path.join(process.cwd(), '_sidebar.md');

        // 写入文件
        await fs.writeFile(outputPath, sidebarContent);

        console.log(`侧边栏已生成: ${outputPath}`);
        console.log('生成完成！');
    } catch (error) {
        console.error('生成侧边栏时出错:', error.message);
        process.exit(1);
    }
}

// 执行主函数
main();
    