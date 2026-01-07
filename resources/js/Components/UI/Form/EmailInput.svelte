<script>
    let { 
        id = '', 
        value = $bindable(''), 
        placeholder = 'you@example.com', 
        error = '', 
        required = false, 
        autocomplete = 'email',
        oninput = () => {},
        onchange = () => {},
        onblur = () => {}
    } = $props();
    
    function handleInput(e) {
        value = e.target.value;
        oninput(e);
    }
    
    function handleChange(e) {
        onchange(e);
    }
    
    function handleBlur(e) {
        onblur(e);
    }
</script>

<div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <i class="fas fa-envelope text-gray-400"></i>
    </div>
    <input
        {id}
        type="email"
        {value}
        {placeholder}
        {required}
        {autocomplete}
        oninput={handleInput}
        onchange={handleChange}
        class="w-full pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg transition-all duration-200 focus:outline-none hover:border-gray-400 {error ? 'border-red-500 bg-red-50' : ''}"
        onfocus={(e) => {
            if (!error) {
                e.currentTarget.style.borderColor = 'var(--theme-primary-500)';
                e.currentTarget.style.boxShadow = '0 0 0 3px var(--theme-primary-500)33';
            }
        }}
        onblur={(e) => {
            handleBlur(e);
            if (!error) {
                e.currentTarget.style.borderColor = '#d1d5db';
            }
            e.currentTarget.style.boxShadow = '';
        }}
    />
</div>