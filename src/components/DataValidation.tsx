import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  TextInput,
  Tile,
  Select,
  SelectItem,
  Toggle,
  Form,
  FormGroup,
  Loading,
  InlineNotification,
  Tag,
  MultiSelect,
  RadioButton,
  RadioButtonGroup,
  FileUploader,
  NumberInput,
} from '@carbon/react';
import ValidationResults from './ValidationResults';
import DataValidationDashboard from './DataValidationDashboard';

interface DataValidationProps {
  onNavigate: (page: string) => void;
  onCompareData?: () => void;
}

const DataValidation: React.FC<DataValidationProps> = ({ onNavigate, onCompareData }) => {
  const [comparisonType, setComparisonType] = useState('single');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [columnSelectionType, setColumnSelectionType] = useState('');
  
  const [formData, setFormData] = useState({
    sourceDatabaseType: '',
    sourceHost: '',
    sourcePort: '',
    sourceUsername: '',
    sourcePassword: '',
    sourceDatabaseName: '',
    sourceUrl: '',
    sourceSchema: '',
    sourceTable: '',
    sourceFile: null,
    
    // Single Table - Target
    targetDatabaseType: '',
    targetHost: '',
    targetPort: '',
    targetUsername: '',
    targetPassword: '',
    targetDatabaseName: '',
    targetUrl: '',
    targetSchema: '',
    targetTable: '',
    targetFile: null,
    
    includeColumns: [],
    excludeColumns: [],
    enableChecksum: false,
    checksumType: 'SHA2',
    enableRowCount: false,
    
    // Full Schema
    sourceSchemaConnection: '',
    sourceSchemaName: '',
    targetSchemaConnection: '',
    targetSchemaName: '',
    includeTablePatterns: [],
    excludeTablePatterns: [],
    validationLevel: '',
    maxConcurrentTables: 1,
    enableSchemaChecksum: false,
    schemaChecksumType: 'SHA2',
    enableSchemaRowCount: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleValidation = async () => {
    handleCompareData();
  };

  const handleCompareData = () => {
    console.log('Comparing data with configuration:', {
      comparisonType,
      formData
    });
    
    if (onCompareData) {
      onCompareData();
    }
  };

  const databaseTypeOptions = [
    { id: '', text: 'Select Option' },
    { id: 'teradata', text: 'Teradata' },
    { id: 'sqlserver', text: 'SQL Server' },
  ];

  const connectionOptions = [
    { id: 'select', text: 'Select Connection' },
    { id: 'production', text: 'Production DB' },
    { id: 'staging', text: 'Staging DB' },
    { id: 'warehouse', text: 'Data Warehouse' },
    { id: 'local', text: 'Local DB' },
  ];

  const schemaOptions = [
    { id: 'select', text: 'Select Schema' },
    { id: 'public', text: 'Public' },
    { id: 'analytics', text: 'Analytics' },
    { id: 'staging', text: 'Staging' },
    { id: 'raw_data', text: 'Raw Data' },
  ];

  const tableOptions = [
    { id: 'select', text: 'Select Table' },
    { id: 'users', text: 'Users' },
    { id: 'customers', text: 'Customers' },
    { id: 'employees', text: 'Employees' },
    { id: 'orders', text: 'Orders' },
  ];

  const columnOptions = [
    { id: 'user_id', text: 'User ID' },
    { id: 'email', text: 'Email' },
    { id: 'name', text: 'Name' },
    { id: 'created_date', text: 'Created Date' },
    { id: 'status', text: 'Status' },
  ];

  const columnSelectionOptions = [
    { id: '', text: 'Select Option' },
    { id: 'include', text: 'Include Columns' },
    { id: 'exclude', text: 'Exclude Columns' },
  ];

  const patternOptions = [
    { id: 'user*', text: 'user*' },
    { id: 'order*', text: 'order*' },
    { id: 'temp*', text: 'temp*' },
    { id: '*_archive', text: '*_archive' },
    { id: '*_temp', text: '*_temp' },
  ];

  const renderSingleTableValidation = () => (
    <div>
      <h2 className="cds--productive-heading-05" style={{ marginBottom: '2rem' }}>
        Single Table Validation
      </h2>

      {/* Source Table */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Source Table
        </h3>
        <Grid>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="source-database-type"
              labelText="Database Type"
              value={formData.sourceDatabaseType}
              onChange={(e) => handleInputChange('sourceDatabaseType', (e.target as HTMLSelectElement).value)}
            >
              {databaseTypeOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="source-host"
              labelText="Host/Server"
              value={formData.sourceHost}
              onChange={(e) => handleInputChange('sourceHost', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="source-port"
              labelText="Port"
              value={formData.sourcePort}
              onChange={(e) => handleInputChange('sourcePort', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="source-database-name"
              labelText="Database Name"
              value={formData.sourceDatabaseName}
              onChange={(e) => handleInputChange('sourceDatabaseName', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="source-username"
              labelText="Username"
              value={formData.sourceUsername}
              onChange={(e) => handleInputChange('sourceUsername', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="source-password"
              labelText="Password"
              type="password"
              value={formData.sourcePassword}
              onChange={(e) => handleInputChange('sourcePassword', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="source-url"
              labelText="URL"
              value={formData.sourceUrl}
              onChange={(e) => handleInputChange('sourceUrl', e.target.value)}
            />
          </Column>
          {/* <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="source-schema"
              labelText="Schema"
              value={formData.sourceSchema}
              onChange={(e) => handleInputChange('sourceSchema', (e.target as HTMLSelectElement).value)}
            >
              {schemaOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="source-table"
              labelText="Table"
              value={formData.sourceTable}
              onChange={(e) => handleInputChange('sourceTable', (e.target as HTMLSelectElement).value)}
            >
              {tableOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <FileUploader
              labelTitle="Or Upload File"
              labelDescription="CSV or Excel files only"
              buttonLabel="Browse files"
              filenameStatus="edit"
              accept={['.csv', '.xlsx', '.xls']}
              multiple={false}
              onChange={(e) => handleInputChange('sourceFile', e.target.files[0])}
            />
          </Column> */}
        </Grid>
      </Tile>

      {/* Target Table */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Target Table
        </h3>
        <Grid>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="target-database-type"
              labelText="Database Type"
              value={formData.targetDatabaseType}
              onChange={(e) => handleInputChange('targetDatabaseType', (e.target as HTMLSelectElement).value)}
            >
              {databaseTypeOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="target-host"
              labelText="Host/Server"
              value={formData.targetHost}
              onChange={(e) => handleInputChange('targetHost', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="target-port"
              labelText="Port"
              value={formData.targetPort}
              onChange={(e) => handleInputChange('targetPort', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="target-database-name"
              labelText="Database Name"
              value={formData.targetDatabaseName}
              onChange={(e) => handleInputChange('targetDatabaseName', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="target-username"
              labelText="Username"
              value={formData.targetUsername}
              onChange={(e) => handleInputChange('targetUsername', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="target-password"
              labelText="Password"
              type="password"
              value={formData.targetPassword}
              onChange={(e) => handleInputChange('targetPassword', e.target.value)}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <TextInput
              id="target-url"
              labelText="URL"
              value={formData.targetUrl}
              onChange={(e) => handleInputChange('targetUrl', e.target.value)}
            />
          </Column>
          {/* <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="target-schema"
              labelText="Schema"
              value={formData.targetSchema}
              onChange={(e) => handleInputChange('targetSchema', (e.target as HTMLSelectElement).value)}
            >
              {schemaOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="target-table"
              labelText="Table"
              value={formData.targetTable}
              onChange={(e) => handleInputChange('targetTable', (e.target as HTMLSelectElement).value)}
            >
              {tableOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <FileUploader
              labelTitle="Or Upload File"
              labelDescription="CSV or Excel files only"
              buttonLabel="Browse files"
              filenameStatus="edit"
              accept={['.csv', '.xlsx', '.xls']}
              multiple={false}
              onChange={(e) => handleInputChange('targetFile', e.target.files[0])}
            />
          </Column> */}
        </Grid>
      </Tile>

      {/* Column Selection */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Column Selection
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="column-selection-type"
              labelText="Column Selection Type"
              value={columnSelectionType}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                setColumnSelectionType(value);
                // Reset column selections when type changes
                handleInputChange('includeColumns', []);
                handleInputChange('excludeColumns', []);
              }}
            >
              {columnSelectionOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          {columnSelectionType === 'include' && (
            <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
              <MultiSelect
                id="include-columns"
                titleText="Include Columns"
                label="Select columns to include"
                items={columnOptions}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItems }) => 
                  handleInputChange('includeColumns', selectedItems.map(item => item.id))
                }
              />
            </Column>
          )}
          {columnSelectionType === 'exclude' && (
            <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
              <MultiSelect
                id="exclude-columns"
                titleText="Exclude Columns"
                label="Select columns to exclude"
                items={columnOptions}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItems }) => 
                  handleInputChange('excludeColumns', selectedItems.map(item => item.id))
                }
              />
            </Column>
          )}
        </Grid>
      </Tile>

      {/* Comparison Options */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Comparison Options
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Toggle
              id="enable-checksum"
              labelText="Enable Checksum Comparison"
              toggled={formData.enableChecksum}
              onToggle={(toggled) => handleInputChange('enableChecksum', toggled)}
            />
            {formData.enableChecksum && (
              <div style={{ marginTop: '1rem' }}>
                <TextInput
                  id="checksum-type"
                  labelText="Hash Type"
                  value="SHA2"
                  readOnly
                />
              </div>
            )}
          </Column>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Toggle
                id="enable-row-count"
                labelText="Quick Row Count Check"
                toggled={formData.enableRowCount}
                onToggle={(toggled) => handleInputChange('enableRowCount', toggled)}
              />
            </div>
            {formData.enableRowCount && (
              <Button kind="secondary" size="sm">
                Check Now
              </Button>
            )}
          </Column>
        </Grid>
      </Tile>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button kind="primary" onClick={handleValidation} disabled={isLoading}>
          Compare Data
        </Button>
      </div>
    </div>
  );

  const renderFullSchemaValidation = () => (
    <div>
      <h2 className="cds--productive-heading-05" style={{ marginBottom: '2rem' }}>
        Full Schema Validation
      </h2>

      {/* Source Schema */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Source Schema
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="source-schema-connection"
              labelText="Connection"
              value={formData.sourceSchemaConnection}
              onChange={(e) => handleInputChange('sourceSchemaConnection', (e.target as HTMLSelectElement).value)}
            >
              {connectionOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="source-schema-name"
              labelText="Schema"
              value={formData.sourceSchemaName}
              onChange={(e) => handleInputChange('sourceSchemaName', (e.target as HTMLSelectElement).value)}
            >
              {schemaOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
        </Grid>
      </Tile>

      {/* Target Schema */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Target Schema
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="target-schema-connection"
              labelText="Connection"
              value={formData.targetSchemaConnection}
              onChange={(e) => handleInputChange('targetSchemaConnection', (e.target as HTMLSelectElement).value)}
            >
              {connectionOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="target-schema-name"
              labelText="Schema"
              value={formData.targetSchemaName}
              onChange={(e) => handleInputChange('targetSchemaName', (e.target as HTMLSelectElement).value)}
            >
              {schemaOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
        </Grid>
      </Tile>

      {/* Table Filtering */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Table Filtering
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <MultiSelect
              id="include-patterns"
              titleText="Include Table Patterns"
              label="Add include patterns"
              items={patternOptions}
              itemToString={(item) => (item ? item.text : '')}
              onChange={({ selectedItems }) => 
                handleInputChange('includeTablePatterns', selectedItems.map(item => item.id))
              }
            />
          </Column>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <MultiSelect
              id="exclude-patterns"
              titleText="Exclude Table Patterns"
              label="Add exclude patterns"
              items={patternOptions}
              itemToString={(item) => (item ? item.text : '')}
              onChange={({ selectedItems }) => 
                handleInputChange('excludeTablePatterns', selectedItems.map(item => item.id))
              }
            />
          </Column>
        </Grid>
      </Tile>

      {/* Comparison Options */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Comparison Options
        </h3>
        <Grid>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="validation-level"
              labelText="Validation Level"
              value={formData.validationLevel}
              onChange={(e) => handleInputChange('validationLevel', (e.target as HTMLSelectElement).value)}
            >
              <SelectItem value="" text="Select validation level" />
              <SelectItem value="rowcount" text="Row Count" />
              <SelectItem value="checksum" text="Checksum" />
            </Select>
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <NumberInput
              id="max-concurrent"
              label="Max Concurrent Tables"
              value={formData.maxConcurrentTables}
              onChange={(e) => handleInputChange('maxConcurrentTables', (e.target as HTMLInputElement).value)}
              min={1}
              max={5}
            />
          </Column>
          <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Toggle
              id="enable-schema-checksum"
              labelText="Enable Checksum Comparison"
              toggled={formData.enableSchemaChecksum}
              onToggle={(toggled) => handleInputChange('enableSchemaChecksum', toggled)}
            />
            {formData.enableSchemaChecksum && (
              <div style={{ marginTop: '1rem' }}>
                <TextInput
                  id="schema-checksum-type"
                  labelText="Hash Type"
                  value="SHA2"
                  readOnly
                />
              </div>
            )}
          </Column>
        </Grid>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginTop: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Toggle
                id="enable-schema-row-count"
                labelText="Quick Row Count Check"
                toggled={formData.enableSchemaRowCount}
                onToggle={(toggled) => handleInputChange('enableSchemaRowCount', toggled)}
              />
            </div>
            {formData.enableSchemaRowCount && (
              <Button kind="secondary" size="sm">
                Check
              </Button>
            )}
          </Column>
        </Grid>
      </Tile>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button kind="primary" onClick={handleValidation} disabled={isLoading}>
          Compare Data
        </Button>
      </div>
    </div>
  );

  const [validationResults, setValidationResults] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [currentWorkspace, setCurrentWorkspace] = useState(null);

  if (validationResults) {
    return <ValidationResults results={validationResults} onNavigate={onNavigate} onReset={() => setValidationResults(null)} />;
  }

  if (showDashboard) {
    return (
      <DataValidationDashboard
        onNavigate={onNavigate}
        onCreateWorkspace={setCurrentWorkspace}
        onBack={() => setShowDashboard(false)}
      />
    );
  }

  return (
    <div className="cds--content" style={{ padding: '6rem 2rem 2rem' }}>
      <Grid className="cds--grid--full-width">
        <Column lg={16} md={8} sm={4}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Button
              kind="ghost"
              onClick={() => onNavigate('data-validation-dashboard')}
              style={{ marginBottom: '2rem' }}
            >
              ← Back to Dashboard
            </Button>
            
            <h1 className="cds--productive-heading-06" style={{ marginBottom: '2rem' }}>
              Data Validation Tool
            </h1>

            {/* Comparison Type Selection */}
            <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
                Comparison Type
              </h3>
              <RadioButtonGroup
                legendText="Select comparison type"
                name="comparison-type"
                value={comparisonType}
                onChange={(value) => setComparisonType(value as string)}
              >
                <RadioButton labelText="Single Table" value="single" id="single" />
                <RadioButton labelText="Full Schema" value="full" id="full" />
              </RadioButtonGroup>
            </Tile>
            
            {isLoading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Loading description="Running validation..." />
                <p style={{ marginTop: '1rem' }}>This may take a few minutes for large datasets...</p>
              </div>
            )}
            
            {!isLoading && (
              <Tile style={{ padding: '2rem', backgroundColor: 'white' }}>
                {comparisonType === 'single' ? renderSingleTableValidation() : renderFullSchemaValidation()}
              </Tile>
            )}
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default DataValidation;
