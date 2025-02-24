// Local storage keys
const STORAGE_KEYS = {
    COMPLETED_LEVELS: 'goLearning_completedLevels',
    COMPLETED_MODULES: 'goLearning_completedModules',
    USER_PROGRESS: 'goLearning_userProgress',
    CODE_FILES: 'goLearning_codeFiles',
  };
  
  export const saveCompletedLevel = (moduleId, levelId) => {
    try {
      const completedLevels = getCompletedLevels();
      const key = `${moduleId}-${levelId}`;
      if (!completedLevels.includes(key)) {
        completedLevels.push(key);
        localStorage.setItem(STORAGE_KEYS.COMPLETED_LEVELS, JSON.stringify(completedLevels));
        updateModuleProgress(moduleId);
      }
    } catch (error) {
      console.error('Error saving completed level:', error);
    }
  };
  
  export const getCompletedLevels = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMPLETED_LEVELS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error getting completed levels:', error);
      return [];
    }
  };
  
  export const updateModuleProgress = (moduleId) => {
    try {
      const completedLevels = getCompletedLevels();
      const moduleCompletedLevels = completedLevels.filter(key => key.startsWith(`${moduleId}-`)).length;
      
      const userProgress = getUserProgress();
      const moduleProgress = userProgress.find(p => p.moduleId === moduleId);
      
      if (moduleProgress) {
        moduleProgress.completed = moduleCompletedLevels;
      }
      
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(userProgress));
      
      // Update completed modules count
      const completedModules = userProgress.filter(p => p.completed === p.total).length;
      localStorage.setItem(STORAGE_KEYS.COMPLETED_MODULES, completedModules.toString());
    } catch (error) {
      console.error('Error updating module progress:', error);
    }
  };
  
  export const getUserProgress = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error getting user progress:', error);
      return [];
    }
  };
  
  export const initializeUserProgress = (modules) => {
    try {
      const existingProgress = getUserProgress();
      
      // Only initialize if no progress exists
      if (existingProgress.length === 0) {
        const progress = modules.map(module => ({
          moduleId: module.id,
          title: module.title,
          completed: 0,
          total: module.levels
        }));
        
        localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
      }
    } catch (error) {
      console.error('Error initializing user progress:', error);
    }
  };
  
  export const saveCodeFiles = (levelId, files) => {
    try {
      const savedFiles = getCodeFiles();
      savedFiles[levelId] = files;
      localStorage.setItem(STORAGE_KEYS.CODE_FILES, JSON.stringify(savedFiles));
    } catch (error) {
      console.error('Error saving code files:', error);
    }
  };
  
  export const getCodeFiles = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CODE_FILES);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error getting code files:', error);
      return {};
    }
  };