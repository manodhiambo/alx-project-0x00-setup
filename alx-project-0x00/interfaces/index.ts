// Interface and Style Validator
// This code validates ButtonProps interface implementation and button styling requirements

export interface PillProps {
  title: string;
}

export interface ButtonProps {
  title: string;
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded-sm' | 'rounded-md' | 'rounded-full';
  onClick?: () => void;
  className?: string;
}

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

interface FileCheck {
  filePath: string;
  content: string;
}

class InterfaceValidator {
  private allowedButtonShapes = ['rounded-sm', 'rounded-md', 'rounded-full'];
  private forbiddenButtonShapes = ['rounded-lg'];
  private forbiddenInterfaceProps = ['styles: string'];

  /**
   * Validates ButtonProps interface implementation
   * Checks that interfaces/index.ts doesn't contain "styles: string"
   */
  validateButtonPropsInterface(fileContent: string): ValidationResult {
    const result: ValidationResult = {
      passed: true,
      errors: [],
      warnings: []
    };

    // Check for forbidden "styles: string" property
    if (fileContent.includes('styles: string')) {
      result.passed = false;
      result.errors.push(
        'ButtonProps interface contains forbidden "styles: string" property. ' +
        'Use "className?: string" instead for styling.'
      );
    }

    // Check if ButtonProps interface exists
    if (!fileContent.includes('interface ButtonProps')) {
      result.passed = false;
      result.errors.push('ButtonProps interface not found in interfaces/index.ts');
    }

    // Validate required ButtonProps properties
    const requiredProps = ['title: string', 'size?:', 'shape?:', 'onClick?:', 'className?:'];
    const missingProps = requiredProps.filter(prop => !fileContent.includes(prop));
    
    if (missingProps.length > 0) {
      result.warnings.push(`Missing or incorrectly defined properties: ${missingProps.join(', ')}`);
    }

    return result;
  }

  /**
   * Validates button shapes in component files
   * Checks that buttons only use allowed shapes: rounded-sm, rounded-md, rounded-full
   * Ensures pages/landing.tsx doesn't contain "rounded-lg"
   */
  validateButtonShapes(fileContent: string, filePath: string): ValidationResult {
    const result: ValidationResult = {
      passed: true,
      errors: [],
      warnings: []
    };

    // Check for forbidden rounded-lg in landing.tsx
    if (filePath.includes('pages/landing.tsx') && fileContent.includes('rounded-lg')) {
      result.passed = false;
      result.errors.push(
        'pages/landing.tsx contains forbidden "rounded-lg" class. ' +
        'Use only allowed button shapes: rounded-sm, rounded-md, rounded-full'
      );
    }

    // Check for any forbidden button shapes in any file
    this.forbiddenButtonShapes.forEach(shape => {
      if (fileContent.includes(shape)) {
        result.passed = false;
        result.errors.push(
          `File ${filePath} contains forbidden button shape "${shape}". ` +
          `Use only allowed shapes: ${this.allowedButtonShapes.join(', ')}`
        );
      }
    });

    // Check if buttons are using allowed shapes
    const buttonElements = fileContent.match(/className[^>]*rounded-\w+/g);
    if (buttonElements) {
      buttonElements.forEach(element => {
        const hasValidShape = this.allowedButtonShapes.some(shape => 
          element.includes(shape)
        );
        
        if (!hasValidShape) {
          result.warnings.push(
            `Button element may not be using allowed shapes: ${element}`
          );
        }
      });
    }

    return result;
  }

  /**
   * Comprehensive validation of all requirements
   */
  validateProject(files: FileCheck[]): ValidationResult {
    const result: ValidationResult = {
      passed: true,
      errors: [],
      warnings: []
    };

    files.forEach(file => {
      // Check interface file
      if (file.filePath.includes('interfaces/index.ts')) {
        const interfaceResult = this.validateButtonPropsInterface(file.content);
        result.errors.push(...interfaceResult.errors);
        result.warnings.push(...interfaceResult.warnings);
        if (!interfaceResult.passed) result.passed = false;
      }

      // Check button shapes in all files
      const shapeResult = this.validateButtonShapes(file.content, file.filePath);
      result.errors.push(...shapeResult.errors);
      result.warnings.push(...shapeResult.warnings);
      if (!shapeResult.passed) result.passed = false;
    });

    return result;
  }

  /**
   * Generates a detailed report of validation results
   */
  generateReport(result: ValidationResult): string {
    let report = '=== Interface and Style Validation Report ===\n\n';
    
    if (result.passed) {
      report += '✅ All validation checks passed!\n\n';
    } else {
      report += '❌ Validation failed. Please fix the following issues:\n\n';
    }

    if (result.errors.length > 0) {
      report += 'ERRORS:\n';
      result.errors.forEach((error, index) => {
        report += `${index + 1}. ${error}\n`;
      });
      report += '\n';
    }

    if (result.warnings.length > 0) {
      report += 'WARNINGS:\n';
      result.warnings.forEach((warning, index) => {
        report += `${index + 1}. ${warning}\n`;
      });
      report += '\n';
    }

    report += 'REQUIREMENTS:\n';
    report += '• ButtonProps interface must NOT contain "styles: string"\n';
    report += '• ButtonProps interface should use "className?: string" for styling\n';
    report += '• Buttons must use only these shapes: rounded-sm, rounded-md, rounded-full\n';
    report += '• pages/landing.tsx must NOT contain "rounded-lg"\n';

    return report;
  }
}

// Usage example
const validator = new InterfaceValidator();

// Example file contents for testing
const exampleFiles: FileCheck[] = [
  {
    filePath: 'interfaces/index.ts',
    content: `
      export interface PillProps {
        title: string;
      }
      
      export interface ButtonProps {
        title: string;
        size?: 'small' | 'medium' | 'large';
        shape?: 'rounded-sm' | 'rounded-md' | 'rounded-full';
        onClick?: () => void;
        className?: string;
      }
    `
  },
  {
    filePath: 'pages/landing.tsx',
    content: `
      import { ButtonProps } from '../interfaces';
      
      const Button = ({ title, shape, className }: ButtonProps) => (
        <button className={\`btn \${shape} \${className}\`}>
          {title}
        </button>
      );
      
      export default function Landing() {
        return (
          <div>
            <Button title="Click me" shape="rounded-md" />
            <Button title="Another" shape="rounded-full" />
          </div>
        );
      }
    `
  }
];

// Run validation
const validationResult = validator.validateProject(exampleFiles);
console.log(validator.generateReport(validationResult));

// Export for use in other modules
export { InterfaceValidator, ValidationResult, FileCheck };
export default validator;
