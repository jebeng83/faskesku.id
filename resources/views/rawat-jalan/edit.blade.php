@extends('layouts.app')

@section('title', 'Edit Data Rawat Jalan')

@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Edit Data Rawat Jalan</h3>
                    <div class="card-tools">
                        <a href="{{ route('rawat-jalan.index') }}" class="btn btn-secondary btn-sm">
                            <i class="fas fa-arrow-left"></i> Kembali
                        </a>
                    </div>
                </div>
                <form action="{{ route('rawat-jalan.update', $rawatJalan->no_rawat) }}" method="POST">
                    @csrf
                    @method('PUT')
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="no_rkm_medis">Pasien <span class="text-danger">*</span></label>
                                    <select class="form-control @error('no_rkm_medis') is-invalid @enderror" 
                                            id="no_rkm_medis" name="no_rkm_medis" required>
                                        <option value="">Pilih Pasien</option>
                                        @foreach($patients as $patient)
                                            <option value="{{ $patient->no_rkm_medis }}" 
                                                    {{ old('no_rkm_medis', $rawatJalan->no_rkm_medis) == $patient->no_rkm_medis ? 'selected' : '' }}>
                                                {{ $patient->no_rkm_medis }} - {{ $patient->nm_pasien }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('no_rkm_medis')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="tgl_registrasi">Tanggal Registrasi <span class="text-danger">*</span></label>
                                    <input type="date" class="form-control @error('tgl_registrasi') is-invalid @enderror" 
                                           id="tgl_registrasi" name="tgl_registrasi" 
                                           value="{{ old('tgl_registrasi', $rawatJalan->tgl_registrasi ? $rawatJalan->tgl_registrasi->format('Y-m-d') : '') }}" required>
                                    @error('tgl_registrasi')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="jam_reg">Jam Registrasi <span class="text-danger">*</span></label>
                                    <input type="time" class="form-control @error('jam_reg') is-invalid @enderror" 
                                           id="jam_reg" name="jam_reg" 
                                           value="{{ old('jam_reg', $rawatJalan->jam_reg ? $rawatJalan->jam_reg->format('H:i') : '') }}" required>
                                    @error('jam_reg')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="kd_dokter">Kode Dokter <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control @error('kd_dokter') is-invalid @enderror" 
                                           id="kd_dokter" name="kd_dokter" 
                                           value="{{ old('kd_dokter', $rawatJalan->kd_dokter) }}" required>
                                    @error('kd_dokter')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="kd_poli">Kode Poli <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control @error('kd_poli') is-invalid @enderror" 
                                           id="kd_poli" name="kd_poli" 
                                           value="{{ old('kd_poli', $rawatJalan->kd_poli) }}" required>
                                    @error('kd_poli')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="kd_pj">Kode Penjamin <span class="text-danger">*</span></label>
                                    <input type="text" class="form-control @error('kd_pj') is-invalid @enderror" 
                                           id="kd_pj" name="kd_pj" 
                                           value="{{ old('kd_pj', $rawatJalan->kd_pj) }}" required>
                                    @error('kd_pj')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="p_jawab">Penanggung Jawab</label>
                                    <input type="text" class="form-control @error('p_jawab') is-invalid @enderror" 
                                           id="p_jawab" name="p_jawab" 
                                           value="{{ old('p_jawab', $rawatJalan->p_jawab) }}">
                                    @error('p_jawab')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="hubunganpj">Hubungan Penanggung Jawab</label>
                                    <input type="text" class="form-control @error('hubunganpj') is-invalid @enderror" 
                                           id="hubunganpj" name="hubunganpj" 
                                           value="{{ old('hubunganpj', $rawatJalan->hubunganpj) }}">
                                    @error('hubunganpj')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="almt_pj">Alamat Penanggung Jawab</label>
                                    <textarea class="form-control @error('almt_pj') is-invalid @enderror" 
                                              id="almt_pj" name="almt_pj" rows="3">{{ old('almt_pj', $rawatJalan->almt_pj) }}</textarea>
                                    @error('almt_pj')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="biaya_reg">Biaya Registrasi</label>
                                    <input type="number" class="form-control @error('biaya_reg') is-invalid @enderror" 
                                           id="biaya_reg" name="biaya_reg" 
                                           value="{{ old('biaya_reg', $rawatJalan->biaya_reg) }}" step="0.01" min="0">
                                    @error('biaya_reg')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="umurdaftar">Umur Daftar</label>
                                    <input type="number" class="form-control @error('umurdaftar') is-invalid @enderror" 
                                           id="umurdaftar" name="umurdaftar" 
                                           value="{{ old('umurdaftar', $rawatJalan->umurdaftar) }}" min="0">
                                    @error('umurdaftar')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="stts">Status <span class="text-danger">*</span></label>
                                    <select class="form-control @error('stts') is-invalid @enderror" 
                                            id="stts" name="stts" required>
                                        <option value="">Pilih Status</option>
                                        @foreach($statusOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('stts', $rawatJalan->stts) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('stts')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="stts_daftar">Status Daftar <span class="text-danger">*</span></label>
                                    <select class="form-control @error('stts_daftar') is-invalid @enderror" 
                                            id="stts_daftar" name="stts_daftar" required>
                                        @foreach($statusDaftarOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('stts_daftar', $rawatJalan->stts_daftar) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('stts_daftar')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="status_lanjut">Status Lanjut <span class="text-danger">*</span></label>
                                    <select class="form-control @error('status_lanjut') is-invalid @enderror" 
                                            id="status_lanjut" name="status_lanjut" required>
                                        @foreach($statusLanjutOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('status_lanjut', $rawatJalan->status_lanjut) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('status_lanjut')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="status_bayar">Status Bayar <span class="text-danger">*</span></label>
                                    <select class="form-control @error('status_bayar') is-invalid @enderror" 
                                            id="status_bayar" name="status_bayar" required>
                                        @foreach($statusBayarOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('status_bayar', $rawatJalan->status_bayar) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('status_bayar')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="status_poli">Status Poli <span class="text-danger">*</span></label>
                                    <select class="form-control @error('status_poli') is-invalid @enderror" 
                                            id="status_poli" name="status_poli" required>
                                        @foreach($statusPoliOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('status_poli', $rawatJalan->status_poli) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('status_poli')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label for="sttsumur">Status Umur</label>
                                    <select class="form-control @error('sttsumur') is-invalid @enderror" 
                                            id="sttsumur" name="sttsumur">
                                        <option value="">Pilih Status Umur</option>
                                        @foreach($sttsumurOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('sttsumur', $rawatJalan->sttsumur) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('sttsumur')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <label for="keputusan">Keputusan</label>
                                    <select class="form-control @error('keputusan') is-invalid @enderror" 
                                            id="keputusan" name="keputusan">
                                        @foreach($keputusanOptions as $key => $value)
                                            <option value="{{ $key }}" {{ old('keputusan', $rawatJalan->keputusan) == $key ? 'selected' : '' }}>
                                                {{ $value }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('keputusan')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Update
                        </button>
                        <a href="{{ route('rawat-jalan.index') }}" class="btn btn-secondary">
                            <i class="fas fa-times"></i> Batal
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
@endsection
