import fs from 'fs';
import path from 'path';
import he from 'he';

const placeOfExamples = './examples';

function processHtmlPlaceholders(inputFilePath: string, outputFilePath: string): void {
  let htmlContent = fs.readFileSync(inputFilePath, 'utf8');

  // Step 1: Process insertCodeBlock placeholders
  htmlContent = htmlContent.replace(/\{\{\{\s*insertCodeBlock\s*\|\s*(.*?)\s*\}\}\}/g, (match, fileName) => {
    const tsPath = path.resolve(placeOfExamples, fileName + '.ts');
    const jsPath = path.resolve(placeOfExamples, fileName + '.js');

    let tsContent = '', jsContent = '';

    try {
      tsContent = fs.existsSync(tsPath) ? he.encode(fs.readFileSync(tsPath, 'utf8')) : 'File not found';
      jsContent = fs.existsSync(jsPath) ? he.encode(fs.readFileSync(jsPath, 'utf8')) : 'File not found';
    } catch (error) {
      console.error(`Error reading code files: ${error}`);
    }

    return `
      <div class="code-block">
        <div class="code-buttons">
          <button class="active" data-target="ts">TS</button>
          <button data-target="js">JS</button>
        </div>
        <pre class="ts active"><code class="language-typescript">${tsContent}</code></pre>
        <pre class="js"><code class="language-javascript">${jsContent}</code></pre>
      </div>
    `;
  });

  htmlContent = htmlContent.replace(/\{\{\{\s*insertTsCodeBlock\s*\|\s*(.*?)\s*\}\}\}/g, (match, fileName) => {
    const tsPath = path.resolve(placeOfExamples, fileName + '.ts');
    const jsPath = path.resolve(placeOfExamples, fileName + '.js');

    let tsContent = '', jsContent = '';

    try {
      tsContent = fs.existsSync(tsPath) ? he.encode(fs.readFileSync(tsPath, 'utf8')) : 'File not found';
    } catch (error) {
      console.error(`Error reading code files: ${error}`);
    }

    return `
      <div class="code-block">
        <pre class="ts active"><code class="language-typescript">${tsContent}</code></pre>
      </div>
    `;
  });

  // Step 2: Process spoiler placeholders
  htmlContent = htmlContent.replace(/\{\{\{\s*spoiler\s*\|\s*(.*?)\s*\}\}\}(.*?)\{\{\{\s*\/spoiler\s*\}\}\}/gs, (match, title, content) => {
    return `
      <div class="spoiler">
        <div class="spoiler-header">
          <h3>${he.encode(title)}</h3>
          <div>
            <span class="show-button">Show</span>
            <span class="hide-button" style="display: none;">Hide</span>
          </div>
        </div>
        <div class="spoiler-content">
          ${content.trim()}
        </div>
      </div>
    `;
  });

  // Write the processed content to the file
  fs.writeFileSync(outputFilePath, htmlContent, 'utf8');
}

processHtmlPlaceholders('./build/resources/index.template.html', './docs/index.html');
