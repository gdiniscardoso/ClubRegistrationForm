using System.ComponentModel.DataAnnotations;

namespace Gunthi.Club.Registration.Form.Core.Entities;

public class InscricaoModel
{
    [Required(ErrorMessage = "O nome é obrigatório")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A data de nascimento é obrigatória")]
    public DateTime? DataNascimento { get; set; }

    [Required(ErrorMessage = "O NIF é obrigatório")]
    [StringLength(9, MinimumLength = 9, ErrorMessage = "O NIF deve ter 9 dígitos")]
    [RegularExpression(@"^\d{9}$", ErrorMessage = "O NIF deve conter apenas números")]
    public string NIF { get; set; } = string.Empty;

    [Required(ErrorMessage = "O BI/CC é obrigatório")]
    public string BI { get; set; } = string.Empty;

    [Required(ErrorMessage = "A validade do BI/CC é obrigatória")]
    public DateTime? ValidadeBI { get; set; }

    [Required(ErrorMessage = "A morada é obrigatória")]
    public string Morada { get; set; } = string.Empty;

    [Required(ErrorMessage = "A localidade é obrigatória")]
    public string Localidade { get; set; } = string.Empty;

    [Required(ErrorMessage = "O código postal é obrigatório")]
    [RegularExpression(@"^\d{4}-\d{3}$", ErrorMessage = "O código postal deve estar no formato XXXX-XXX")]
    public string CodigoPostal { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telemóvel é obrigatório")]
    [RegularExpression(@"^9\d{8}$", ErrorMessage = "O telemóvel deve começar por 9 e ter 9 dígitos")]
    public string Telemovel { get; set; } = string.Empty;

    [Required(ErrorMessage = "O nome do encarregado de educação é obrigatório")]
    public string Encarregado1 { get; set; } = string.Empty;

    [Required(ErrorMessage = "O grau de parentesco é obrigatório")]
    public string GrauParentesco1 { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email do encarregado de educação é obrigatório")]
    [EmailAddress(ErrorMessage = "Email do encarregado de educação inválido")]
    public string Email1 { get; set; } = string.Empty;

    [Required(ErrorMessage = "O telemóvel do encarregado de educação é obrigatório")]
    [RegularExpression(@"^9\d{8}$", ErrorMessage = "O telemóvel deve começar por 9 e ter 9 dígitos")]
    public string Telemovel1 { get; set; } = string.Empty;

    // Optional second guardian
    public string Encarregado2 { get; set; } = string.Empty;
    public string GrauParentesco2 { get; set; } = string.Empty;

    [EmailAddress(ErrorMessage = "Email do segundo encarregado de educação inválido")]
    public string Email2 { get; set; } = string.Empty;

    [RegularExpression(@"^9\d{8}$", ErrorMessage = "O telemóvel deve começar por 9 e ter 9 dígitos")]
    public string Telemovel2 { get; set; } = string.Empty;

    public bool AutorizaTransporte { get; set; }
    public bool AutorizaImagem { get; set; }
}