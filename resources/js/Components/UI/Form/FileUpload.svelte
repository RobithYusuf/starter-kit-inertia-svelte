<script>
    let { 
        id = '',
        name = '',
        accept = '*',
        multiple = false,
        maxSize = 5,
        disabled = false,
        error = '',
        label = 'Upload files',
        hint = '',
        onchange = null
    } = $props();
    
    let inputId = $derived(id || `fileupload-${Math.random().toString(36).substr(2, 9)}`);
    let files = $state([]);
    let isDragging = $state(false);
    let inputRef = $state(null);
    
    let hintText = $derived(hint || `Max file size: ${maxSize}MB`);
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
    
    function handleFiles(fileList) {
        const newFiles = Array.from(fileList).filter(file => {
            const sizeMB = file.size / (1024 * 1024);
            return sizeMB <= maxSize;
        });
        
        if (multiple) {
            files = [...files, ...newFiles];
        } else {
            files = newFiles.slice(0, 1);
        }
        
        onchange?.(files);
    }
    
    function handleDrop(event) {
        event.preventDefault();
        isDragging = false;
        handleFiles(event.dataTransfer.files);
    }
    
    function handleDragOver(event) {
        event.preventDefault();
        isDragging = true;
    }
    
    function handleDragLeave() {
        isDragging = false;
    }
    
    function handleInputChange(event) {
        handleFiles(event.target.files);
    }
    
    function removeFile(index) {
        files = files.filter((_, i) => i !== index);
        onchange?.(files);
    }
    
    function openFilePicker() {
        inputRef?.click();
    }
</script>

<div>
    {#if label}
        <label class="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    {/if}
    
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div 
        ondrop={handleDrop}
        ondragover={handleDragOver}
        ondragleave={handleDragLeave}
        onclick={openFilePicker}
        class="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
               {isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'}
               {error ? 'border-red-500 bg-red-50' : ''}
               {disabled ? 'opacity-50 cursor-not-allowed' : ''}"
    >
        <input
            bind:this={inputRef}
            type="file"
            id={inputId}
            {name}
            {accept}
            {multiple}
            {disabled}
            onchange={handleInputChange}
            class="hidden"
        />
        
        <div class="flex flex-col items-center">
            <i class="fas fa-cloud-upload-alt text-3xl text-gray-400 mb-3"></i>
            <p class="text-sm text-gray-600">
                <span class="text-primary-600 font-medium">Click to upload</span> or drag and drop
            </p>
            <p class="text-xs text-gray-500 mt-1">{hintText}</p>
        </div>
    </div>
    
    {#if error}
        <p class="mt-1 text-sm text-red-600">{error}</p>
    {/if}
    
    {#if files.length > 0}
        <ul class="mt-3 space-y-2">
            {#each files as file, index}
                <li class="flex items-center justify-between px-3 py-2 bg-gray-50 rounded-lg">
                    <div class="flex items-center gap-2 min-w-0">
                        <i class="fas fa-file text-gray-400"></i>
                        <span class="text-sm text-gray-700 truncate">{file.name}</span>
                        <span class="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                    </div>
                    <button 
                        type="button"
                        onclick={() => removeFile(index)}
                        class="text-gray-400 hover:text-red-600 transition-colors"
                    >
                        <i class="fas fa-times"></i>
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
